export const estateAdmin = ({
  FULL_NAME,
  ESTATE_NAME,
  EMAIL_ADDRESS,
  TEMP_PASSWORD,
  LOGIN_URL,
}: {
  FULL_NAME: string;
  ESTATE_NAME: string;
  EMAIL_ADDRESS: string;
  TEMP_PASSWORD: string;
  LOGIN_URL: string;
}) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: 'Inter', Arial, sans-serif;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="background-color: #f5f5f5"
    >
      <tr>
        <td style="padding: 40px 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            "
          >
            <tr>
              <td
                style="
                  background: linear-gradient(135deg, #1e3a5f 0%, #d97757 100%);
                  padding: 40px 32px;
                  text-align: center;
                "
              >
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 700;
                  "
                >
                  Welcome to Entri
                </h1>
                <p
                  style="
                    margin: 8px 0 0 0;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 16px;
                  "
                >
                  Your Estate Management Platform
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 32px">
                <p
                  style="
                    margin: 0 0 16px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Hi <strong>${FULL_NAME}</strong>,
                </p>
                <p
                  style="
                    margin: 0 0 24px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  You've been assigned as an
                  <strong style="color: #d97757">Estate Administrator</strong>
                  for <strong>${ESTATE_NAME}</strong>. Your account is now
                  active!
                </p>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #f5efe7;
                    border-radius: 8px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 24px">
                      <h3
                        style="
                          margin: 0 0 16px 0;
                          color: #1e3a5f;
                          font-size: 16px;
                          font-weight: 600;
                        "
                      >
                        Your Login Credentials
                      </h3>
                      <p
                        style="
                          margin: 0 0 8px 0;
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 600;
                          text-transform: uppercase;
                        "
                      >
                        Email Address
                      </p>
                      <p
                        style="
                          margin: 0 0 16px 0;
                          color: #2c3e50;
                          font-size: 15px;
                          font-family: 'Courier New', monospace;
                          background: #ffffff;
                          padding: 10px;
                          border-radius: 4px;
                        "
                      >
                        ${EMAIL_ADDRESS}
                      </p>
                      <p
                        style="
                          margin: 0 0 8px 0;
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 600;
                          text-transform: uppercase;
                        "
                      >
                        Temporary Password
                      </p>
                      <p
                        style="
                          margin: 0 0 16px 0;
                          color: #2c3e50;
                          font-size: 15px;
                          font-family: 'Courier New', monospace;
                          background: #ffffff;
                          padding: 10px;
                          border-radius: 4px;
                        "
                      >
                        ${TEMP_PASSWORD}
                      </p>
                      <p
                        style="
                          margin: 0 0 8px 0;
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 600;
                          text-transform: uppercase;
                        "
                      >
                        Your Role
                      </p>
                      <p
                        style="
                          margin: 0;
                          color: #d97757;
                          font-size: 15px;
                          font-weight: 600;
                        "
                      >
                        Estate Administrator
                      </p>
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="margin: 32px 0"
                >
                  <tr>
                    <td align="center">
                      <a
                        href="${LOGIN_URL}"
                        style="
                          display: inline-block;
                          background-color: #d97757;
                          color: #ffffff;
                          text-decoration: none;
                          padding: 14px 32px;
                          border-radius: 8px;
                          font-weight: 600;
                          font-size: 16px;
                        "
                        >Access Your Dashboard</a
                      >
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #fff5f1;
                    border-left: 4px solid #d97757;
                    border-radius: 4px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 16px 20px">
                      <p
                        style="
                          margin: 0;
                          color: #d97757;
                          font-size: 14px;
                          font-weight: 600;
                        "
                      >
                        🔐 Security First
                      </p>
                      <p
                        style="
                          margin: 8px 0 0 0;
                          color: #2c3e50;
                          font-size: 14px;
                          line-height: 1.6;
                        "
                      >
                        Please change your temporary password immediately after
                        your first login.
                      </p>
                    </td>
                  </tr>
                </table>
                <p
                  style="
                    margin: 24px 0 0 0;
                    color: #64748b;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  Need help? Contact
                  <a
                    href="mailto:entri@neurobytes.io"
                    style="color: #d97757; text-decoration: none"
                    >entri@neurobytes.io</a
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="
                  background-color: #fafaf8;
                  padding: 24px 32px;
                  border-top: 1px solid #e2e8f0;
                "
              >
                <p
                  style="
                    margin: 0 0 8px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    font-weight: 600;
                  "
                >
                  Connect. Manage. Thrive.
                </p>
                <p style="margin: 0; color: #64748b; font-size: 13px">
                  © 2025 Entri by Neurobytes. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const residentUser = ({
  FULL_NAME,
  ESTATE_NAME,
  EMAIL_ADDRESS,
  TEMP_PASSWORD,
  LOGIN_URL,
}: {
  FULL_NAME: string;
  ESTATE_NAME: string;
  EMAIL_ADDRESS: string;
  TEMP_PASSWORD: string;
  LOGIN_URL: string;
}) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: 'Inter', Arial, sans-serif;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="background-color: #f5f5f5"
    >
      <tr>
        <td style="padding: 40px 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            "
          >
            <tr>
              <td
                style="
                  background: linear-gradient(135deg, #1e3a5f 0%, #d97757 100%);
                  padding: 40px 32px;
                  text-align: center;
                "
              >
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 700;
                  "
                >
                  Welcome Home!
                </h1>
                <p
                  style="
                    margin: 8px 0 0 0;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 16px;
                  "
                >
                  Your Entri account is ready
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 32px">
                <p
                  style="
                    margin: 0 0 16px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Hi <strong>${FULL_NAME}</strong>,
                </p>
                <p
                  style="
                    margin: 0 0 24px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Welcome to <strong>${ESTATE_NAME}</strong>! Your Entri
                  account has been created.
                </p>
                <p
                  style="
                    margin: 0 0 24px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Generate visitor codes, pay service charges, report issues,
                  and stay updated—all in one place.
                </p>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #f5efe7;
                    border-radius: 8px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 24px">
                      <h3
                        style="
                          margin: 0 0 16px 0;
                          color: #1e3a5f;
                          font-size: 16px;
                          font-weight: 600;
                        "
                      >
                        Your Login Credentials
                      </h3>
                      <p
                        style="
                          margin: 0 0 8px 0;
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 600;
                          text-transform: uppercase;
                        "
                      >
                        Email Address
                      </p>
                      <p
                        style="
                          margin: 0 0 16px 0;
                          color: #2c3e50;
                          font-size: 15px;
                          font-family: 'Courier New', monospace;
                          background: #ffffff;
                          padding: 10px;
                          border-radius: 4px;
                        "
                      >
                        ${EMAIL_ADDRESS}
                      </p>
                      <p
                        style="
                          margin: 0 0 8px 0;
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 600;
                          text-transform: uppercase;
                        "
                      >
                        Temporary Password
                      </p>
                      <p
                        style="
                          margin: 0 0 16px 0;
                          color: #2c3e50;
                          font-size: 15px;
                          font-family: 'Courier New', monospace;
                          background: #ffffff;
                          padding: 10px;
                          border-radius: 4px;
                        "
                      >
                        ${TEMP_PASSWORD}
                      </p>
                      <p
                        style="
                          margin: 0 0 8px 0;
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 600;
                          text-transform: uppercase;
                        "
                      >
                        Your Role
                      </p>
                      <p
                        style="
                          margin: 0;
                          color: #d97757;
                          font-size: 15px;
                          font-weight: 600;
                        "
                      >
                        Resident
                      </p>
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="margin: 32px 0"
                >
                  <tr>
                    <td align="center">
                      <a
                        href="${LOGIN_URL}"
                        style="
                          display: inline-block;
                          background-color: #d97757;
                          color: #ffffff;
                          text-decoration: none;
                          padding: 14px 32px;
                          border-radius: 8px;
                          font-weight: 600;
                          font-size: 16px;
                        "
                        >Log In to Entri</a
                      >
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #fff5f1;
                    border-left: 4px solid #d97757;
                    border-radius: 4px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 16px 20px">
                      <p
                        style="
                          margin: 0;
                          color: #d97757;
                          font-size: 14px;
                          font-weight: 600;
                        "
                      >
                        🔐 First Login
                      </p>
                      <p
                        style="
                          margin: 8px 0 0 0;
                          color: #2c3e50;
                          font-size: 14px;
                          line-height: 1.6;
                        "
                      >
                        Change your password when you first log in. Choose a
                        strong password.
                      </p>
                    </td>
                  </tr>
                </table>
                <p
                  style="
                    margin: 24px 0 0 0;
                    color: #64748b;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  Questions?
                  <a
                    href="mailto:entri@neurobytes.io"
                    style="color: #d97757; text-decoration: none"
                    >entri@neurobytes.io</a
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="
                  background-color: #fafaf8;
                  padding: 24px 32px;
                  border-top: 1px solid #e2e8f0;
                "
              >
                <p
                  style="
                    margin: 0 0 8px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    font-weight: 600;
                  "
                >
                  Connect. Manage. Thrive.
                </p>
                <p style="margin: 0; color: #64748b; font-size: 13px">
                  © 2025 Entri by Neurobytes. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const securityUser = ({
  FULL_NAME,
  ESTATE_NAME,
  EMAIL_ADDRESS,
  TEMP_PASSWORD,
  LOGIN_URL,
}: {
  FULL_NAME: string;
  ESTATE_NAME: string;
  EMAIL_ADDRESS: string;
  TEMP_PASSWORD: string;
  LOGIN_URL: string;
}) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: 'Inter', Arial, sans-serif;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="background-color: #f5f5f5"
    >
      <tr>
        <td style="padding: 40px 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            "
          >
            <tr>
              <td
                style="
                  background: linear-gradient(135deg, #1e3a5f 0%, #d97757 100%);
                  padding: 40px 32px;
                  text-align: center;
                "
              >
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 700;
                  "
                >
                  Welcome to the Team
                </h1>
                <p
                  style="
                    margin: 8px 0 0 0;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 16px;
                  "
                >
                  Your Entri Security Account
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 32px">
                <p
                  style="
                    margin: 0 0 16px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Hi <strong>${FULL_NAME}</strong>,
                </p>
                <p
                  style="
                    margin: 0 0 24px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  You've been registered as a
                  <strong style="color: #d97757">Security Guard</strong> for
                  <strong>${ESTATE_NAME}</strong>.
                </p>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #f5efe7;
                    border-radius: 8px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 24px">
                      <h3
                        style="
                          margin: 0 0 16px 0;
                          color: #1e3a5f;
                          font-size: 16px;
                          font-weight: 600;
                        "
                      >
                        Your Login Credentials
                      </h3>
                      <p
                        style="
                          margin: 0 0 8px 0;
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 600;
                          text-transform: uppercase;
                        "
                      >
                        Email Address
                      </p>
                      <p
                        style="
                          margin: 0 0 16px 0;
                          color: #2c3e50;
                          font-size: 15px;
                          font-family: 'Courier New', monospace;
                          background: #ffffff;
                          padding: 10px;
                          border-radius: 4px;
                        "
                      >
                        ${EMAIL_ADDRESS}
                      </p>
                      <p
                        style="
                          margin: 0 0 8px 0;
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 600;
                          text-transform: uppercase;
                        "
                      >
                        Temporary Password
                      </p>
                      <p
                        style="
                          margin: 0 0 16px 0;
                          color: #2c3e50;
                          font-size: 15px;
                          font-family: 'Courier New', monospace;
                          background: #ffffff;
                          padding: 10px;
                          border-radius: 4px;
                        "
                      >
                        ${TEMP_PASSWORD}
                      </p>
                      <p
                        style="
                          margin: 0 0 8px 0;
                          color: #64748b;
                          font-size: 13px;
                          font-weight: 600;
                          text-transform: uppercase;
                        "
                      >
                        Your Role
                      </p>
                      <p
                        style="
                          margin: 0;
                          color: #d97757;
                          font-size: 15px;
                          font-weight: 600;
                        "
                      >
                        Security Guard
                      </p>
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #eff6ff;
                    border-radius: 8px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 20px">
                      <h3
                        style="
                          margin: 0 0 12px 0;
                          color: #1e3a5f;
                          font-size: 15px;
                          font-weight: 600;
                        "
                      >
                        Quick Guide
                      </h3>
                      <ul
                        style="
                          margin: 0;
                          padding-left: 20px;
                          color: #2c3e50;
                          font-size: 14px;
                          line-height: 1.8;
                        "
                      >
                        <li>Validate visitor codes instantly</li>
                        <li>Log all entries and exits</li>
                        <li>Report incidents with photos</li>
                        <li>View resident information</li>
                      </ul>
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="margin: 32px 0"
                >
                  <tr>
                    <td align="center">
                      <a
                        href="${LOGIN_URL}"
                        style="
                          display: inline-block;
                          background-color: #d97757;
                          color: #ffffff;
                          text-decoration: none;
                          padding: 14px 32px;
                          border-radius: 8px;
                          font-weight: 600;
                          font-size: 16px;
                        "
                        >Access Security Portal</a
                      >
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #fff5f1;
                    border-left: 4px solid #d97757;
                    border-radius: 4px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 16px 20px">
                      <p
                        style="
                          margin: 0;
                          color: #d97757;
                          font-size: 14px;
                          font-weight: 600;
                        "
                      >
                        🔐 Important
                      </p>
                      <p
                        style="
                          margin: 8px 0 0 0;
                          color: #2c3e50;
                          font-size: 14px;
                          line-height: 1.6;
                        "
                      >
                        Change your password after first login. Keep credentials
                        secure.
                      </p>
                    </td>
                  </tr>
                </table>
                <p
                  style="
                    margin: 24px 0 0 0;
                    color: #64748b;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  Need help?
                  <a
                    href="mailto:entri@neurobytes.io"
                    style="color: #d97757; text-decoration: none"
                    >entri@neurobytes.io</a
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="
                  background-color: #fafaf8;
                  padding: 24px 32px;
                  border-top: 1px solid #e2e8f0;
                "
              >
                <p
                  style="
                    margin: 0 0 8px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    font-weight: 600;
                  "
                >
                  Connect. Manage. Thrive.
                </p>
                <p style="margin: 0; color: #64748b; font-size: 13px">
                  © 2025 Entri by Neurobytes. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const passwordResetTemplate = ({
  FULL_NAME,
  EMAIL_ADDRESS,
  RESET_CODE,
}: {
  FULL_NAME: string;
  EMAIL_ADDRESS: string;
  RESET_CODE: string;
}) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: 'Inter', Arial, sans-serif;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="background-color: #f5f5f5"
    >
      <tr>
        <td style="padding: 40px 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            "
          >
            <tr>
              <td
                style="
                  background: linear-gradient(135deg, #1e3a5f 0%, #d97757 100%);
                  padding: 40px 32px;
                  text-align: center;
                "
              >
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 700;
                  "
                >
                  Password Reset Request
                </h1>
                <p
                  style="
                    margin: 8px 0 0 0;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 16px;
                  "
                >
                  Let's get you back in
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 32px">
                <p
                  style="
                    margin: 0 0 16px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Hi <strong>${FULL_NAME}</strong>,
                </p>
                <p
                  style="
                    margin: 0 0 24px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  We received a request to reset your password for
                  <strong>${EMAIL_ADDRESS}</strong>.
                </p>
                <p
                  style="
                    margin: 0 0 24px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Fill the Code below along with your new password. This code expires in
                  <strong>1 hour</strong>.
                </p>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="margin: 32px 0"
                >
                  <tr>
                    <td align="center">
                      <div
                        style="
                          display: inline-block;
                          background-color: #d97757;
                          color: #ffffff;
                          text-decoration: none;
                          padding: 14px 32px;
                          border-radius: 8px;
                          font-weight: 600;
                          font-size: 16px;
                        "
                      > ${RESET_CODE}</div
                    </td>
                  </tr>
                </table>
               
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #fff5f1;
                    border-left: 4px solid #d97757;
                    border-radius: 4px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 16px 20px">
                      <p
                        style="
                          margin: 0;
                          color: #d97757;
                          font-size: 14px;
                          font-weight: 600;
                        "
                      >
                        ⚠️ Didn't request this?
                      </p>
                      <p
                        style="
                          margin: 8px 0 0 0;
                          color: #2c3e50;
                          font-size: 14px;
                          line-height: 1.6;
                        "
                      >
                        Ignore this email or contact support immediately. Your
                        account is still secure.
                      </p>
                    </td>
                  </tr>
                </table>
                <p
                  style="
                    margin: 24px 0 0 0;
                    color: #64748b;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  Need help?
                  <a
                    href="mailto:entri@neurobytes.io"
                    style="color: #d97757; text-decoration: none"
                    >entri@neurobytes.io</a
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="
                  background-color: #fafaf8;
                  padding: 24px 32px;
                  border-top: 1px solid #e2e8f0;
                "
              >
                <p
                  style="
                    margin: 0 0 8px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    font-weight: 600;
                  "
                >
                  Connect. Manage. Thrive.
                </p>
                <p style="margin: 0; color: #64748b; font-size: 13px">
                  © 2025 Entri by Neurobytes. All rights reserved.
                </p>
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
  FULL_NAME,
  EXPIRY_DATE,
  RENEWAL_URL,
  ESTATE_NAME,
  PLAN_NAME,
  AMOUNT,
  DAYS_REMAINING,
}: {
  FULL_NAME: string;
  ESTATE_NAME: string;
  DAYS_REMAINING: string;
  PLAN_NAME: string;
  EXPIRY_DATE: string;
  AMOUNT: string;
  RENEWAL_URL: string;
}) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: 'Inter', Arial, sans-serif;
    "
  >
    <table
      role="presentation"
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      style="background-color: #f5f5f5"
    >
      <tr>
        <td style="padding: 40px 20px">
          <table
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
            width="600"
            style="
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            "
          >
            <tr>
              <td
                style="
                  background: linear-gradient(135deg, #1e3a5f 0%, #d97757 100%);
                  padding: 40px 32px;
                  text-align: center;
                "
              >
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 700;
                  "
                >
                  Subscription Renewal
                </h1>
                <p
                  style="
                    margin: 8px 0 0 0;
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 16px;
                  "
                >
                  Keep your estate connected
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding: 40px 32px">
                <p
                  style="
                    margin: 0 0 16px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Hi <strong>${FULL_NAME}</strong>,
                </p>
                <p
                  style="
                    margin: 0 0 24px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    line-height: 1.6;
                  "
                >
                  Your Entri subscription for
                  <strong>${ESTATE_NAME}</strong> expires in
                  <strong style="color: #d97757">${DAYS_REMAINING} days</strong
                  >.
                </p>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #f5efe7;
                    border-radius: 8px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 24px">
                      <h3
                        style="
                          margin: 0 0 16px 0;
                          color: #1e3a5f;
                          font-size: 16px;
                          font-weight: 600;
                        "
                      >
                        Subscription Details
                      </h3>
                      <table
                        role="presentation"
                        cellspacing="0"
                        cellpadding="0"
                        border="0"
                        width="100%"
                      >
                        <tr>
                          <td
                            style="
                              padding: 8px 0;
                              color: #64748b;
                              font-size: 14px;
                            "
                          >
                            Estate:
                          </td>
                          <td
                            style="
                              padding: 8px 0;
                              color: #2c3e50;
                              font-size: 14px;
                              font-weight: 600;
                              text-align: right;
                            "
                          >
                            ${ESTATE_NAME}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              padding: 8px 0;
                              color: #64748b;
                              font-size: 14px;
                            "
                          >
                            Current Plan:
                          </td>
                          <td
                            style="
                              padding: 8px 0;
                              color: #2c3e50;
                              font-size: 14px;
                              font-weight: 600;
                              text-align: right;
                            "
                          >
                            ${PLAN_NAME}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              padding: 8px 0;
                              color: #64748b;
                              font-size: 14px;
                            "
                          >
                            Expires On:
                          </td>
                          <td
                            style="
                              padding: 8px 0;
                              color: #d97757;
                              font-size: 14px;
                              font-weight: 600;
                              text-align: right;
                            "
                          >
                            ${EXPIRY_DATE}
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              padding: 8px 0;
                              border-top: 1px solid #e2e8f0;
                              color: #64748b;
                              font-size: 14px;
                              padding-top: 16px;
                            "
                          >
                            Renewal Amount:
                          </td>
                          <td
                            style="
                              padding: 8px 0;
                              border-top: 1px solid #e2e8f0;
                              color: #2c3e50;
                              font-size: 18px;
                              font-weight: 700;
                              text-align: right;
                              padding-top: 16px;
                            "
                          >
                            ${AMOUNT}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #eff6ff;
                    border-radius: 8px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 20px">
                      <h3
                        style="
                          margin: 0 0 12px 0;
                          color: #1e3a5f;
                          font-size: 15px;
                          font-weight: 600;
                        "
                      >
                        Continue Enjoying:
                      </h3>
                      <ul
                        style="
                          margin: 0;
                          padding-left: 20px;
                          color: #2c3e50;
                          font-size: 14px;
                          line-height: 1.8;
                        "
                      >
                        <li>Unlimited visitor access codes</li>
                        <li>Automated payment collection</li>
                        <li>Repair management</li>
                        <li>Real-time analytics</li>
                        <li>24/7 priority support</li>
                      </ul>
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="margin: 32px 0"
                >
                  <tr>
                    <td align="center">
                      <a
                        href="${RENEWAL_URL}"
                        style="
                          display: inline-block;
                          background-color: #d97757;
                          color: #ffffff;
                          text-decoration: none;
                          padding: 14px 32px;
                          border-radius: 8px;
                          font-weight: 600;
                          font-size: 16px;
                        "
                        >Renew Subscription</a
                      >
                    </td>
                  </tr>
                </table>
                <table
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                  width="100%"
                  style="
                    background-color: #fff5f1;
                    border-left: 4px solid #d97757;
                    border-radius: 4px;
                    margin: 24px 0;
                  "
                >
                  <tr>
                    <td style="padding: 16px 20px">
                      <p
                        style="
                          margin: 0;
                          color: #d97757;
                          font-size: 14px;
                          font-weight: 600;
                        "
                      >
                        ⏰ What Happens If I Don't Renew?
                      </p>
                      <p
                        style="
                          margin: 8px 0 0 0;
                          color: #2c3e50;
                          font-size: 14px;
                          line-height: 1.6;
                        "
                      >
                        After expiry, residents can't generate codes or make
                        payments. Data preserved for 30 days.
                      </p>
                    </td>
                  </tr>
                </table>
                <p
                  style="
                    margin: 24px 0 0 0;
                    color: #64748b;
                    font-size: 14px;
                    line-height: 1.6;
                  "
                >
                  Questions?
                  <a
                    href="mailto:entri@neurobytes.io"
                    style="color: #d97757; text-decoration: none"
                    >entri@neurobytes.io</a
                  >
                </p>
              </td>
            </tr>
            <tr>
              <td
                style="
                  background-color: #fafaf8;
                  padding: 24px 32px;
                  border-top: 1px solid #e2e8f0;
                "
              >
                <p
                  style="
                    margin: 0 0 8px 0;
                    color: #2c3e50;
                    font-size: 16px;
                    font-weight: 600;
                  "
                >
                  Connect. Manage. Thrive.
                </p>
                <p style="margin: 0; color: #64748b; font-size: 13px">
                  © 2025 Entri by Neurobytes. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
