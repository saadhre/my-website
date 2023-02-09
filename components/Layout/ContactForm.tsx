import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Trans, useTranslation } from "next-i18next";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { pl } from "yup-locales";

import { ContactFormValidationSchema } from "../../lib/api";

import { Disclaimer, Form, FormError, FormField, FormFieldError, SubmitButton, SuccessMessage } from "../Form";
import { SectionTitle } from "../SectionTitle";

yup.setLocale(pl);

export interface ContactFormProps {
  languages: string;
}

export interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ languages }) => {
  const { t } = useTranslation();
  const [working, setWorking] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormInputs>({
    resolver: yupResolver(ContactFormValidationSchema),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = data => {
    setWorking(true);

    axios.post('/api/process-contact', data).then(() => {
      setSuccess(true);
    }).catch(reason => {
      setError(t('errorContactProcessing', 'Ups, coś się popsuło 😢 Spróbuj jeszcze raz. Kod błędu: {{code}}', { code: reason.response.status }));
    }).finally(() => {
      setWorking(false);
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SectionTitle variant="h2">
        <Trans
          i18nKey="contactFormTitle"
          defaults="Kontakt"
        />
      </SectionTitle>
      <fieldset disabled={working || success}>
        <FormField>
          <label htmlFor="name">
            <Trans
              i18nKey="contactFormYourName"
              defaults="Twoje imię"
            />
          </label>
          <input id="name" placeholder={t('greeting', 'Miło Ciebie poznać 🙂')} {...register('name')} />
          <FormFieldError error={errors.name} />
        </FormField>
        <FormField>
          <label htmlFor="email">
            E-mail
          </label>
          <input id="email" {...register('email')} />
          <FormFieldError error={errors.email} />
        </FormField>
        <FormField>
          <label htmlFor="message">
            <Trans
              i18nKey="contactFormMessage"
              defaults="Wiadomość"
            />
          </label>
          <textarea id="message" {...register('message')} />
          <FormFieldError error={errors.message} />
        </FormField>
      </fieldset>
      <Disclaimer>
        <Trans i18nKey="contactFormDisclaimer">
          Twoje dane zostaną wykorzystane wyłącznie do nawiązania kontaktu. Nie będziesz otrzymywał newsletterów ani
          innych informacji handlowych.
        </Trans>
      </Disclaimer>
      <Disclaimer>
        <Trans
          i18nKey="contactFormLanguages"
          defaults="Możesz porozmawiać w następujących językach:"
        />
        {' '}
        {languages}
      </Disclaimer>
      <SubmitButton type="submit" disabled={working || success}>
        <Trans
          i18nKey="contactFormSubmit"
          defaults="Wyślij wiadomość"
        />
      </SubmitButton>
      {error && !success && <FormError error={{ message: error }} />}
      {success && (
        <SuccessMessage>
          <Trans
            i18nKey="contactFormSuccess"
            defaults="Dziękuję 🙂 Odpowiem ASAP."
          />
        </SuccessMessage>
      )}
    </Form>
  );
};
