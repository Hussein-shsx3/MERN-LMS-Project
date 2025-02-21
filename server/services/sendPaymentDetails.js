import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPaymentDetails = (userEmail, paymentInfo) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "🎉 Payment Successful - Your Course Purchase Details",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
            }
            .header {
              background-color: #4CAF50;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .content {
              padding: 20px;
              background-color: #ffffff;
              border: 1px solid #dddddd;
            }
            .purchase-details {
              background-color: #f9f9f9;
              padding: 15px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .detail-row {
              margin: 10px 0;
              border-bottom: 1px solid #eeeeee;
              padding-bottom: 10px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              font-size: 14px;
              color: #666666;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #4CAF50;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
            }
            .social-links {
              margin-top: 20px;
            }
            .social-links a {
              margin: 0 10px;
              color: #4CAF50;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>Payment Successful! 🎊</h1>
            </div>
            
            <div class="content">
              <p>Dear ${paymentInfo.userName},</p>
              
              <p>Thank you for purchasing our course! Your payment has been successfully processed, and we're excited to have you on board.</p>
              
              <div class="purchase-details">
                <h2>Purchase Details</h2>
                <div class="detail-row">
                  <strong>Course:</strong> ${paymentInfo.courseName}
                </div>
                <div class="detail-row">
                  <strong>Amount Paid:</strong> $${paymentInfo.amount}
                </div>
                <div class="detail-row">
                  <strong>Transaction ID:</strong> ${paymentInfo.transactionId}
                </div>
                <div class="detail-row">
                  <strong>Purchase Date:</strong> ${new Date().toLocaleDateString()}
                </div>
              </div>
              
              <a href="${
                process.env.COURSE_URL
              }" class="button">Start Learning Now</a>
              
              <p>If you have any questions or need assistance, our support team is here to help. You can reach us at <a href="mailto:support@yourlms.com">support@yourlms.com</a>.</p>
              
              <div class="social-links">
                <p>Follow us on social media for updates and tips:</p>
                <a href="#">Facebook</a> |
                <a href="#">Twitter</a> |
                <a href="#">LinkedIn</a>
              </div>
            </div>
            
            <div class="footer">
              <p>© ${new Date().getFullYear()} Your LMS Team. All rights reserved.</p>
              <p>This email was sent to ${userEmail}. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
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
