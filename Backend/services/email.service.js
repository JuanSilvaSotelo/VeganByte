import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (to, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verifica tu correo electrónico - Madre Raíz',
    html: `
      <p>Hola,</p>
      <p>Gracias por registrarte en Madre Raíz. Por favor, verifica tu correo electrónico haciendo clic en el siguiente enlace:</p>
      <p><a href="${verificationUrl}">Verificar Correo Electrónico</a></p>
      <p>Si no te registraste en Madre Raíz, por favor ignora este correo.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export default { sendVerificationEmail };