import { ajvResolver } from "@hookform/resolvers/ajv";
import axios, { AxiosError } from "axios";
import { Trans, useTranslation } from "next-i18next";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Disclaimer, Form, FormError, FormField, FormFieldError, SubmitButton, SuccessMessage } from "../Form";
import { SectionTitle } from "../SectionTitle";

export interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormProps {
  languages: string;
}
export const ContactForm = ({ languages }: ContactFormProps) => {
  const { t } = useTranslation();
  const [working, setWorking] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const stringProperty = (minLength = 2, pattern: string = '') => {
    return {
      type: 'string',
      minLength,
      pattern,
      errorMessage: {
        minLength: t('errors.fieldRequired', 'To pole jest wymagane'),
        pattern: t('errors.email', 'Niepoprawny adres e-mail'),
      },
    };
  };

  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormInputs>({
    resolver: ajvResolver({
      type: 'object',
      properties: {
        name: stringProperty(),
        message: stringProperty(),
        email: stringProperty(5, '^.+\@.+\..+$'),
      },
      required: ['name', 'email', 'message'],
      additionalProperties: false,
    }),
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async data => {
    setWorking(true);
    try {
      await axios.post(`/api/process-contact-form`, data, {});
      setSuccess(true);
    } catch (e) {
      let errorMessage = 'Ups, wystąpił nieznany błąd 😢 Spróbuj jeszcze raz.';
      if (e instanceof AxiosError) {
        errorMessage = t('errorContactProcessing', 'Ups, coś się popsuło 😢 Spróbuj jeszcze raz. Kod błędu: {{code}}', { code: e.code });
      }
      setError(errorMessage);
    } finally {
      setWorking(false);
    }
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
