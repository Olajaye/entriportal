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
  resetUrl,
  supportEmail,
  expiryTime,
}: {
  name: string;
  resetUrl: string;
  supportEmail: string;
  expiryTime: string;
}) => `<!DOCTYPE html>
<html lang="en" style="font-family: Arial, sans-serif;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f9fafb;">
    <table
      role="presentation"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
    >
      <tr>
        <td align="center" style="padding: 40px 0;">
          <table
            role="presentation"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);"
          >
            <tr>
              <td style="padding: 40px 40px 20px 40px;">
                <h2 style="margin: 0; color: #111827;">Hi ${name},</h2>
                <p style="margin: 16px 0; color: #4b5563;">
                  You requested to reset your password. Click the button below to proceed:
                </p>
                <div style="margin: 30px 0; text-align: center;">
                  <a
                    href="${resetUrl}"
                    style="background-color: #f59e0b; color: #fff; padding: 14px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; display: inline-block;"
                  >
                    Reset Password
                  </a>
                </div>
                <p style="color: #6b7280;">
                  This link will expire in <strong>${expiryTime}</strong>. If you didn’t request a password reset, you can ignore this email.
                </p>
                <p style="color: #6b7280; margin-top: 24px;">
                  If you have any questions, contact us at
                  <a href="mailto: ${supportEmail}" style="color: #f59e0b;">${supportEmail}</a>.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px 40px; text-align: center; font-size: 12px; color: #9ca3af;">
                &copy; 2025 entri. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

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
