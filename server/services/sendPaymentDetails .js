import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or use another email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPaymentDetails = (userEmail, paymentInfo) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Payment Success - Your Course Purchase Details",
    text: `Dear ${paymentInfo.userName},

    Your payment was successful. Here are the details of your purchase:
    
    - Courses: ${paymentInfo.courseName}
    - Amount: $${paymentInfo.amount}
    - Transaction ID: ${paymentInfo.transactionId}
    
    Thank you for purchasing our course! If you have any questions, feel free to reach out to us.

    Best regards,
    Your LMS Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email: ", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendPaymentDetails;
