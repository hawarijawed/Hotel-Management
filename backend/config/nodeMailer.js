import mailer from 'nodemailer';

const transporter = mailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
//   secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}); 

export default transporter; 