import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPaymentDetails = (userEmail, paymentInfo) => {
  const mailOptions = {
    from: {
      name: "Your LMS Team", // Adding a proper sender name
      address: process.env.EMAIL_USER,
    },
    to: userEmail,
    subject: "Payment Confirmation - Course Purchase Details", // Removed emoji from subject
    headers: {
      "List-Unsubscribe": `<mailto:unsubscribe@yourlms.com?subject=unsubscribe>, <${process.env.UNSUBSCRIBE_URL}>`,
      Precedence: "bulk",
    },
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Payment Confirmation</title>
          <style>
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
            }
            .header {
              background-color: #2C5282;  // More professional color
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
              background-color: #ffffff;
            }
            .purchase-details {
              background-color: #f8fafc;
              padding: 15px;
              margin: 20px 0;
            }
            .detail-row {
              margin: 10px 0;
              padding-bottom: 10px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 12px;
              color: #666666;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #2C5282;
              color: white;
              text-decoration: none;
              margin: 20px 0;
            }
            .social-links {
              margin-top: 20px;
            }
            .social-links a {
              color: #2C5282;
              text-decoration: underline;
              margin: 0 10px;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Payment Confirmation</h1>
            </div>
            
            <div class="content">
              <p>Dear ${paymentInfo.userName},</p>
              
              <p>Thank you for your course purchase. Your payment has been successfully processed.</p>
              
              <div class="purchase-details">
                <h2>Purchase Details</h2>
                <div class="detail-row">
                  <strong>Course:</strong> ${paymentInfo.courseName}
                </div>
                <div class="detail-row">
                  <strong>Amount:</strong> $${paymentInfo.amount}
                </div>
                <div class="detail-row">
                  <strong>Transaction ID:</strong> ${paymentInfo.transactionId}
                </div>
                <div class="detail-row">
                  <strong>Date:</strong> ${new Date().toLocaleDateString()}
                </div>
              </div>
              
              <p>To access your course:</p>
              <a href="${
                process.env.COURSE_URL
              }" class="button">Access Your Course</a>
              
              <p>If you need assistance, contact us at support@yourlms.com.</p>
              
              <div class="social-links">
                <p>Connect with us:</p>
                <a href="${process.env.FACEBOOK_URL}">Facebook</a>
                <a href="${process.env.TWITTER_URL}">Twitter</a>
                <a href="${process.env.LINKEDIN_URL}">LinkedIn</a>
              </div>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your LMS Team</p>
              <p>You received this email because you purchased a course on Your LMS.</p>
              <p>To unsubscribe from promotional emails, <a href="${
                process.env.UNSUBSCRIBE_URL
              }">click here</a></p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Payment Confirmation - Course Purchase

      Dear ${paymentInfo.userName},

      Thank you for your course purchase. Your payment has been successfully processed.

      Purchase Details:
      Course: ${paymentInfo.courseName}
      Amount: $${paymentInfo.amount}
      Transaction ID: ${paymentInfo.transactionId}
      Date: ${new Date().toLocaleDateString()}

      Access your course at: ${process.env.COURSE_URL}

      Need help? Contact us at support@yourlms.com

      © ${new Date().getFullYear()} Your LMS Team
      
      To unsubscribe from promotional emails, visit: ${
        process.env.UNSUBSCRIBE_URL
      }
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
