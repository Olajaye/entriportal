export const tenantAdminTemplate = ({
  name,
  email,
  role,
  password,
  estate,
  link,
}: {
  name: string;
  email: string;
  role: string;
  estate: string;
  password: string;
  link: string;
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; }
    .header { text-align: center; color: #333; }
    .details { margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 5px; }
    .detail-item { margin-bottom: 10px; }
    .footer { margin-top: 30px; font-size: 0.9em; color: #777; text-align: center; }
    @media (max-width: 600px) { .container { padding: 10px; } }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="header">Welcome to EntriPortal, ${name} 🎉</h1>

    <p>Hello ${name},</p>
    <p>You have been successfully onboarded as a Tenant Admin. Below are your login credentials:</p>

    <div class="details">
      <div class="detail-item"><strong>Email:</strong> ${email}</div>
      <div class="detail-item"><strong>Temporary Password:</strong> ${password}</div>
      <div class="detail-item"><strong>Estate Name:</strong> ${estate}</div>
       <div class="detail-item"><strong>User Role:</strong> ${role}</div>
    </div>

    <p>⚠️ Please log in and change your password as soon as possible for security reasons.</p>
    <p>To get started, visit <a href=${link} target="_blank">your dashboard</a>.</p>

    <div class="footer">
      &copy; ${new Date().getFullYear()} EntriPortal. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

export const passwordResetTemplate = ({
  name,
  resetCode,
  supportEmail,
  expiryTime,
}: {
  name: string;
  resetCode: string;
  supportEmail: string;
  expiryTime: string;
}) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                border-radius: 0 !important;
            }
            .content {
                padding: 20px !important;
            }
            .code-container {
                padding: 15px !important;
            }
            .code {
                font-size: 32px !important;
                letter-spacing: 8px !important;
                padding: 20px 10px !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Logo/Brand Header -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin-bottom: 20px;">
                    <tr>
                        <td align="center">
                            <div style="font-size: 24px; font-weight: bold; color: #f59e0b;">ENTRI</div>
                        </td>
                    </tr>
                </table>

                <!-- Main Content Card -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 40px 40px 30px 40px; text-align: center;">
                            <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600;">Password Reset</h1>
                            <p style="margin: 8px 0 0 0; color: rgba(255, 255, 255, 0.9); font-size: 16px;">Secure your account</p>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 40px;">
                            <!-- Greeting -->
                            <p style="margin: 0 0 20px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                                Hello <strong>${name}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #6b7280; font-size: 16px; line-height: 1.6;">
                                You requested to reset your password. Use the verification code below to proceed:
                            </p>

                            <!-- Reset Code -->
                            <div style="text-align: center; margin: 32px 0;">
                                <div class="code-container" style="background: #fef3c7; border: 2px dashed #f59e0b; border-radius: 12px; padding: 20px; display: inline-block;">
                                    <div class="code" style="font-family: 'Courier New', monospace; font-size: 40px; font-weight: 700; color: #92400e; letter-spacing: 12px; padding: 10px 20px; background: #fef3c7; border-radius: 8px;">
                                        ${resetCode}
                                    </div>
                                </div>
                            </div>

                            <!-- Instructions -->
                            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0;">
                                <h3 style="margin: 0 0 12px 0; color: #374151; font-size: 16px; font-weight: 600;">📝 Instructions:</h3>
                                <ol style="margin: 0; padding-left: 20px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                    <li>Enter this code in the password reset form</li>
                                    <li>Create your new password</li>
                                    <li>Sign in with your new credentials</li>
                                </ol>
                            </div>

                            <!-- Expiry Warning -->
                            <div style="background: #fef2f2; border-left: 4px solid #dc2626; border-radius: 4px; padding: 16px; margin: 24px 0;">
                                <p style="margin: 0; color: #dc2626; font-size: 14px; font-weight: 500;">
                                    ⚠️ This code will expire in <strong>${expiryTime}</strong>
                                </p>
                            </div>

                            <!-- Security Note -->
                            <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 24px;">
                                <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">
                                    <strong>Security Tip:</strong> Never share this code with anyone. Our team will never ask for your verification code.
                                </p>
                                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                                    If you didn't request this reset, please ignore this email or contact support if you're concerned about your account's security.
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>

                <!-- Support Section -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin-top: 20px;">
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">
                                Need help? Contact our support team
                            </p>
                            <a href="mailto:${supportEmail}" style="color: #f59e0b; text-decoration: none; font-weight: 500; font-size: 14px;">
                                ${supportEmail}
                            </a>
                        </td>
                    </tr>
                </table>

                <!-- Footer -->
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin-top: 20px;">
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                                &copy; 2024 Entri. All rights reserved.<br>
                                This email was sent to you as part of our account security services.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

export const subscriptionReminderTemplate = ({
  estateName,
  plan,
  expirationDate,
  upgradeLink,
  supportLink,
}: {
  estateName: string;
  plan: string;
  expirationDate: string;
  upgradeLink: string;
  supportLink: string;
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Subscription Expiration Reminder</title>
    <style>
      body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        background-color: #f7f9fc;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .email-container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .header {
        background-color: #2563eb; /* Entri blue accent */
        color: white;
        text-align: center;
        padding: 25px 20px;
      }

      .header h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
      }

      .content {
        padding: 30px 25px;
        text-align: left;
        line-height: 1.6;
      }

      .content h2 {
        color: #111827;
        font-size: 20px;
        margin-bottom: 15px;
      }

      .content p {
        margin: 10px 0;
        color: #374151;
      }

      .highlight {
        color: #2563eb;
        font-weight: 600;
      }

      .button {
        display: inline-block;
        background-color: #2563eb;
        color: #ffffff;
        text-decoration: none;
        padding: 12px 22px;
        border-radius: 6px;
        font-weight: 600;
        margin-top: 25px;
      }

      .footer {
        background-color: #f3f4f6;
        text-align: center;
        padding: 15px 20px;
        font-size: 14px;
        color: #6b7280;
      }

      .footer a {
        color: #2563eb;
        text-decoration: none;
      }

      @media (max-width: 600px) {
        .content {
          padding: 20px;
        }

        .button {
          display: block;
          width: 100%;
          text-align: center;
        }
      }
    </style>
  </head>

  <body>
    <div class="email-container">
      <div class="header">
        <h1>Subscription Reminder</h1>
      </div>

      <div class="content">
        <h2>Hi ${estateName} Team,</h2>

        <p>
          We wanted to remind you that your current
          <span class="highlight">${plan}</span> subscription plan will expire
          on <span class="highlight">${expirationDate}</span>.
        </p>

        <p>
          To ensure uninterrupted access to your Entri services, please renew or
          upgrade your plan before the expiration date.
        </p>

        <a
          href="${upgradeLink}"
          class="button"
          target="_blank"
          >Renew / Upgrade Plan</a
        >

        <p>
          If you’ve already renewed, please disregard this message. Thank you
          for being a valued member of the Entri community!
        </p>
      </div>

      <div class="footer">
        <p>
          © {{currentYear}} Entri. All rights reserved.  
          <br />
          <a href="${supportLink}">Contact Support</a>
        </p>
      </div>
    </div>
  </body>
</html>`;
