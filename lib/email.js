const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.YAGMAIL_USER,
    pass: process.env.YAGMAIL_PASSWORD
  }
});

const sendTestLink = async (email, name, testId) => {
  const testLink = `${process.env.BASE_URL}/test/${testId}`;
  
  const mailOptions = {
    from: process.env.YAGMAIL_USER,
    to: email,
    subject: 'Zaina Solutions - Aptitude Test Invitation',
    html: `
      <h2>Hello ${name},</h2>
      <p>Thank you for applying to Zaina Solutions!</p>
      <p>Please complete your aptitude test by clicking the link below:</p>
      <a href="${testLink}" style="display:inline-block;padding:10px 20px;background:#0070f3;color:white;text-decoration:none;border-radius:5px;">Start Test</a>
      <p><strong>Important:</strong></p>
      <ul>
        <li>The test contains 10 questions related to your field</li>
        <li>Your time will be tracked</li>
        <li>Copy-paste is disabled</li>
        <li>Complete the test in one sitting</li>
      </ul>
      <p>Good luck!</p>
      <p>Best regards,<br>Zaina Solutions Team</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
};

module.exports = { sendTestLink };
