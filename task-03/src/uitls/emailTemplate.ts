export const verificationTemplate = (id) => {
  const verificationLink = `http://localhost:8080/api/v1/user/verify/${id}`
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .email-wrapper {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background-color: #4CAF50;
                padding: 20px;
                text-align: center;
                color: white;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            .email-header h1 {
                margin: 0;
                font-size: 24px;
            }
            .email-body {
                padding: 30px;
                font-size: 16px;
                line-height: 1.6;
                color: #333333;
            }
            .email-body p {
                margin-bottom: 20px;
            }
            .email-button {
                display: inline-block;
                padding: 12px 25px;
                background-color: #4CAF50;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 20px;
            }
            .email-footer {
                text-align: center;
                font-size: 12px;
                color: #777777;
                padding: 20px;
                background-color: #f4f4f4;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="email-wrapper">
                <div class="email-header">
                    <h1>Email Verification</h1>
                </div>
                <div class="email-body">
                    <p>Dear User,</p>
                    <p>Thank you for registering with us! To complete your registration, please verify your email address by clicking the button below.</p>
                    <a href="${verificationLink}" class="email-button">Verify Email</a>
                    <p>If the button above doesn't work, please copy and paste the following URL into your browser:</p>
                    <p><a href="${verificationLink}">${verificationLink}</a></p>
                    <p>If you did not sign up for this account, please ignore this email.</p>
                    <p>Thank you!<br>The Company Team</p>
                </div>
                <div class="email-footer">
                    <p>If you have any questions, feel free to contact us at support@company.com.</p>
                    <p>&copy; 2024 Company Name. All rights reserved.</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};


export const interviewTemplate = (
    candidateName: string,
    date: string,
    time: string,
    googleMeetLink: string,
    interviewerName: string,
    interviewType: string
  ) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Interview Scheduled</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  width: 100%;
                  padding: 20px;
                  background-color: #f4f4f4;
              }
              .email-wrapper {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                  background-color: #007BFF;
                  padding: 20px;
                  text-align: center;
                  color: white;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
              }
              .email-header h1 {
                  margin: 0;
                  font-size: 24px;
              }
              .email-body {
                  padding: 30px;
                  font-size: 16px;
                  line-height: 1.6;
                  color: #333333;
              }
              .email-body p {
                  margin-bottom: 20px;
              }
              .email-button {
                  display: inline-block;
                  padding: 12px 25px;
                  background-color: #007BFF;
                  color: white;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  margin-top: 20px;
              }
              .email-footer {
                  text-align: center;
                  font-size: 12px;
                  color: #777777;
                  padding: 20px;
                  background-color: #f4f4f4;
                  border-bottom-left-radius: 8px;
                  border-bottom-right-radius: 8px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="email-wrapper">
                  <div class="email-header">
                      <h1>Interview Scheduled</h1>
                  </div>
                  <div class="email-body">
                      <p>Dear ${candidateName},</p>
                      <p>We are excited to inform you that your interview has been scheduled. Below are the details:</p>
                      <ul>
                          <li><strong>Date:</strong> ${date}</li>
                          <li><strong>Time:</strong> ${time}</li>
                          <li><strong>Interview Type:</strong> ${interviewType}</li>
                          <li><strong>Interviewer:</strong> ${interviewerName}</li>
                      </ul>
                      <p>To attend the interview, please join via the following Google Meet link:</p>
                      <a href="${googleMeetLink}" class="email-button">Join Interview</a>
                      <p>If the button above doesn't work, please copy and paste the following URL into your browser:</p>
                      <p><a href="${googleMeetLink}">${googleMeetLink}</a></p>
                      <p>If you have any questions or need to reschedule, please feel free to contact us.</p>
                      <p>Good luck!<br>The Company Team</p>
                  </div>
                  <div class="email-footer">
                      <p>If you have any questions, feel free to contact us at support@company.com.</p>
                      <p>&copy; 2024 Company Name. All rights reserved.</p>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `;
  };
  