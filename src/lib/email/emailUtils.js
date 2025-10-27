import nodemailer from "nodemailer";
import { passwordResetTemplate, subscriptionReminderTemplate, tenantAdminTemplate } from "./emailTemplates";

// SMTP Configuration settings for Zoho Mail - TLS
// Outgoing Server Settings:

// Outgoing Server Name: smtppro.zoho.com
// Port: 587
// Security Type: TLS

//  SMTP Configuration settings for Zoho Mail - SSL
// Outgoing Server Name: smtppro.zoho.com
// Port: 465
// Security Type: SSL
// Require Authentication: Yes.

const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.com", // Replace with your SMTP server host (e.g., smtp.gmail.com for Gmail)
  port: 587, // Typically 587 for TLS, 465 for SSL, or 25
  secure: false, // Use false for TLS
  auth: {
    user: "entri@neurobytes.io", // Your email address 'fitscript@creaondigital.com'
    pass: "GascoNGV2025", // Your email password or app-specific password 'trythebest05'
  },
});

export const sendEmail = async (
  to,
  subject,
  type,
  data
) => {
  const templateMap = {
    tenantAdminTemplate: tenantAdminTemplate,
    passwordResetTemplate: passwordResetTemplate,
    subscriptionReminderTemplate: subscriptionReminderTemplate
  };

  const templateFunction = templateMap[type];

  if (!templateFunction) {
    console.error(`Unknown email type: ${type}`);
    return;
  }

  try {
    const html = templateFunction(data);

    const mailOptions = {
      from: "Entri@neurobytes.io",
      to,
      subject,
      text: subject,
      html,
    };

    console.log("Ready to Transport");
    const info = await transporter.sendMail(mailOptions);
    console.log("info:", info);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Email failed:", error.message);
    console.error("Email:", error);
    return error;
  }
};
