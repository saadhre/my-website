import type { NextApiRequest, NextApiResponse } from "next";
import type { ContactFormInputs } from "../../components/ContactForm";

import * as mailer from "nodemailer";

import { ContactFormValidationSchema } from "../../lib/schemas";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") res.status(405).json("Method not allowed");

  const data = req.body as ContactFormInputs;

  ContactFormValidationSchema.validate(data)
    .then(result => {
      const smtp = mailer.createTransport({
        host: String(process.env.SMTP_HOST),
        port: Number(process.env.SMTP_PORT),
        auth: {
          type: "LOGIN",
          user: String(process.env.SMTP_USER),
          pass: String(process.env.SMTP_PASSWORD),
        }
      });

      const emailContent = `
      Imię: ${result.name}
      
      E-mail: ${result.email}
      
      Wiadomość:
      
      ${result.message}
      `;

      smtp.sendMail({
        from: "MyWebsite <yarik@shatkevich.com>",
        to: "yarik@shatkevich.com",
        subject: "Nowy kontakt ze strony",
        text: emailContent,
      }).then(() => {
        res.status(200).json(undefined)
      }).catch(reason => {
        res.status(500).json(reason);
      });
    })
    .catch(reason => {
      res.status(422).json({
        errors: reason.errors,
      });
    });
}
