const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: "aasgharalich283@gmail.com",
    pass: "Sadwal@123",
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"Ecomer App" <aasgharalich283@gmail.com>',
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { sendEmail };
