const nodemailer = require('nodemailer');
require('dotenv').config();

const sendMail = async(name, email, subject, message) => {
    try {
        //Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        //Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: `"${name}" <${email}>`,
            subject: subject,
            text: message,
            html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Message:</strong><br>${message}</p>`
        };
        //send the mail
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
        return {success: true, info};

    } catch (error) {
        console.error("Error sending email:", error);
        return{success: false, error}
    }
};
module.exports= sendMail;