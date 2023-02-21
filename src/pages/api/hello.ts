// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import * as nodemailer from 'nodemailer'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { formName, formEmail, formInstance } = req.body;

  const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'automatedemail031@gmail.com',
        pass: 'pmzztbomuglprfuw'
    }
  })

  const template = `
  <h1>${formName}</h1>
  <p>mail : ${formEmail}</p>
  <h4>Instance</h4>
  <p>${formInstance}</p>
  `;

  await smtpTransport
      .sendMail({
          from: 'automatedemail031@gmail.com',
          to: 'gustavoiafelix@gmail.com',
          cc: 'automatedemail031@gmail.com',
          subject:
              `[NOVO E-MAIL] ${formName}`,
          html: `${template}`,
          priority: 'high'
      })
      .then(() => {
          // console.log({ message: 'Email sent!' });
          return res.status(201).send({ status : 'Send!'});
      })
      .catch((error: any) => {
          // console.error({ error: `${error}` });
          return res.status(400).send({ status : 'Failed!' });
      });
}
