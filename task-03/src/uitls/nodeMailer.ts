import nodemailer from "nodemailer";
import { EnvVars } from "../config/serverConfig";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: EnvVars.USER,
    pass: EnvVars.PASS,
  },
});

const MailSender = async (email,emailtemplate) => {

  try {
    const info = await transporter.sendMail({
      from: EnvVars.USER,
      to: email,
      subject: "Verify your account ✔",
      text: "Please verify your account by clicking the link below.",
      html: emailtemplate, 
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default MailSender;
