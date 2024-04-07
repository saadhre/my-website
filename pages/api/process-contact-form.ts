import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  function respondWithCode(code: number, message: string) {
    return res.status(code).json({ message });
  }

  if (req.method !== 'POST') {
    return respondWithCode(405, 'Method Not Allowed');
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return respondWithCode(422, 'Missing required fields');
  }

  const input = {
    Source: "My Website <website@shatkevich.dev>",
    Destination: {
      ToAddresses: [
        "yarik@shatkevich.com",
      ],
    },
    Message: {
      Subject: {
        Data: "Nowa wiadomość z mojej strony",
        Charset: "utf8",
      },
      Body: {
        Text: {
          Data: `Imię: ${name}\nE-mail: ${email}\n\nMessage:\n\n${message}`,
          Charset: "utf8",
        },
      },
    }
  };

  let credentials;

  if (process.env.SES_ACCESS_KEY_ID && process.env.SES_SECRET_ACCESS_KEY) {
    credentials = {
      accessKeyId: `${process.env.SES_ACCESS_KEY_ID}`,
      secretAccessKey: `${process.env.SES_SECRET_ACCESS_KEY}`,
    }
  }

  const client = new SESClient({
    region: "eu-central-1",
    credentials,
  });

  const command = new SendEmailCommand(input);

  try {
    const response = await client.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      return respondWithCode(500, `Sending error. API response code: ${response.$metadata.httpStatusCode}`);
    }
  } catch (e) {
    return respondWithCode(500, `Sending error. Error: ${e}`);
  }

  return respondWithCode(200, 'Successfully sent');
}
