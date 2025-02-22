import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPaymentDetails = (userEmail, paymentInfo) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const mailOptions = {
    from: {
      name: process.env.COMPANY_NAME,
      address: process.env.EMAIL_USER,
    },
    to: userEmail,
    subject: "Course Purchase Confirmation",
    headers: {
      "List-Unsubscribe": `<mailto:unsubscribe@${process.env.DOMAIN}?subject=unsubscribe>, <${process.env.UNSUBSCRIBE_URL}>`,
      Precedence: "bulk",
    },
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Purchase Confirmation</title>
          <style>
            /* Reset styles */
            body, p, h1, h2, h3, h4, h5, h6, table, td {
              margin: 0;
              padding: 0;
              font-family: 'Arial', sans-serif;
            }
            
            /* Base styles */
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              color: #2D3748;
              line-height: 1.5;
            }
            
            .header {
              padding: 32px 40px;
              background-color: #1A365D;
            }
            
            .logo {
              width: 120px;
              height: auto;
            }
            
            .content {
              padding: 40px;
            }
            
            .section {
              margin-bottom: 32px;
            }
            
            .section-title {
              color: #2D3748;
              font-size: 20px;
              font-weight: 600;
              margin-bottom: 16px;
            }
            
            .purchase-details {
              width: 100%;
              border-collapse: collapse;
              margin: 16px 0;
            }
            
            .purchase-details td {
              padding: 12px;
              border-bottom: 1px solid #E2E8F0;
            }
            
            .purchase-details td:first-child {
              font-weight: 600;
              width: 40%;
            }
            
            .cta-button {
              display: inline-block;
              background-color: #1A365D;
              color: #ffffff;
              padding: 14px 24px;
              text-decoration: none;
              border-radius: 4px;
              margin: 24px 0;
              font-weight: 500;
            }
            
            .divider {
              border-top: 1px solid #E2E8F0;
              margin: 32px 0;
            }
            
            .footer {
              padding: 32px 40px;
              background-color: #F7FAFC;
              font-size: 14px;
              color: #4A5568;
            }
            
            .contact-info {
              margin-top: 16px;
            }
            
            .social-links {
              margin-top: 24px;
            }
            
            .social-links a {
              color: #1A365D;
              text-decoration: none;
              margin-right: 16px;
            }
            
            .legal {
              margin-top: 24px;
              font-size: 12px;
              color: #718096;
            }
            
            @media only screen and (max-width: 480px) {
              .content, .header, .footer {
                padding: 24px;
              }
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <img src="${process.env.LOGO_URL}" alt="${
      process.env.COMPANY_NAME
    }" class="logo">
            </div>
            
            <div class="content">
              <div class="section">
                <p>Dear ${paymentInfo.userName},</p>
                <p style="margin-top: 16px;">Thank you for your purchase. This email confirms that your payment has been processed successfully.</p>
              </div>
              
              <div class="section">
                <h2 class="section-title">Transaction Details</h2>
                <table class="purchase-details">
                  <tr>
                    <td>Course</td>
                    <td>${paymentInfo.courseName}</td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>${formatCurrency(paymentInfo.amount)}</td>
                  </tr>
                  <tr>
                    <td>Transaction ID</td>
                    <td>${paymentInfo.transactionId}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>${formatDate(new Date())}</td>
                  </tr>
                </table>
              </div>
              
              <div class="section">
                <p>To begin your learning journey:</p>
                <a href="${
                  process.env.COURSE_URL
                }" class="cta-button">Access Your Course</a>
              </div>
              
              <div class="divider"></div>
              
              <div class="section">
                <p>Should you require any assistance, our support team is available Monday through Friday, 9:00 AM - 5:00 PM EST.</p>
                <div class="contact-info">
                  <p>Email: support@${process.env.DOMAIN}</p>
                  <p>Phone: ${process.env.SUPPORT_PHONE}</p>
                </div>
              </div>
            </div>
            
            <div class="footer">
              <div class="social-links">
                <a href="${process.env.LINKEDIN_URL}">LinkedIn</a>
                <a href="${process.env.TWITTER_URL}">Twitter</a>
                <a href="${process.env.FACEBOOK_URL}">Facebook</a>
              </div>
              
              <div class="legal">
                <p>© ${new Date().getFullYear()} ${
      process.env.COMPANY_NAME
    }. All rights reserved.</p>
                <p style="margin-top: 8px;">This is a transactional email regarding your recent purchase. To manage your email preferences or unsubscribe from promotional communications, please visit our <a href="${
                  process.env.EMAIL_PREFERENCES_URL
                }" style="color: #1A365D;">preference center</a>.</p>
                <p style="margin-top: 8px;">${process.env.COMPANY_ADDRESS}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Purchase Confirmation

      Dear ${paymentInfo.userName},

      Thank you for your purchase. This email confirms that your payment has been processed successfully.

      Transaction Details:
      Course: ${paymentInfo.courseName}
      Amount: ${formatCurrency(paymentInfo.amount)}
      Transaction ID: ${paymentInfo.transactionId}
      Date: ${formatDate(new Date())}

      To access your course, visit: ${process.env.COURSE_URL}

      Need assistance?
      Our support team is available Monday through Friday, 9:00 AM - 5:00 PM EST.
      Email: support@${process.env.DOMAIN}
      Phone: ${process.env.SUPPORT_PHONE}

      © ${new Date().getFullYear()} ${
      process.env.COMPANY_NAME
    }. All rights reserved.

      To manage your email preferences or unsubscribe from promotional communications, visit:
      ${process.env.EMAIL_PREFERENCES_URL}

      ${process.env.COMPANY_ADDRESS}
    `,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info);
      }
    });
  });
};

export default sendPaymentDetails;
