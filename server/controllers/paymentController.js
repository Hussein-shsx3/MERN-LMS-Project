import Stripe from "stripe";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import sendPaymentDetails from "../services/sendPaymentDetails.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const courseData = req.body;
    console.log("📩 Received Course Data:", courseData);

    if (!courseData || courseData.length === 0) {
      return res.status(400).json({ message: "No courses selected" });
    }

    // Format line items for Stripe Checkout
    const lineItems = courseData.map((course) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: course.title, // Only include the course title
        },
        unit_amount: Math.round(course.price * 100), // Convert dollars to cents
      },
      quantity: 1,
    }));

    // Reduce metadata size (only send course IDs and titles)
    const courseMetadata = courseData.map((course) => ({
      _id: course._id, // Keep only the course ID
      title: course.title, // Keep only the course title
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      customer_email: req.user.email,
      line_items: lineItems,
      metadata: {
        userId: req.user.id, // User ID
        courses: JSON.stringify(courseMetadata), // Only include course IDs and titles
      },
    });

    console.log("✅ Stripe Checkout Session Created:", session.url);
    res.json({ url: session.url }); // Send checkout URL to frontend
  } catch (error) {
    console.error("❌ Stripe Checkout Error:", error.message);
    next(error);
  }
};

export const webhookHandler = async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"];
    console.log("🔹 Stripe Webhook Signature:", sig);

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody, // Make sure Express is not parsing the body before this
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Webhook Verification Failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("🔔 Webhook Event Type:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("✅ Payment Successful:", session.id);

      const userId = session.metadata.userId;
      const courses = JSON.parse(session.metadata.courses); // Parse the simplified metadata
      console.log("📚 Courses Purchased:", courses);

      // Find user
      const user = await User.findById(userId);
      if (!user) {
        console.error("❌ User not found in database!");
        return res.status(404).json({ message: "User not found" });
      }

      console.log("👤 User Found:", user.email);

      const courseIds = courses.map((course) => course._id);
      console.log("🆕 Enrolling User in Courses:", courseIds);

      // Add to user's enrolled courses
      user.coursesEnrolled = [
        ...new Set([...user.coursesEnrolled, ...courseIds]),
      ];
      await user.save();
      console.log("✅ User Enrollment Updated!");

      // Update courses with new student
      const updateResult = await Course.updateMany(
        { _id: { $in: courseIds } },
        { $addToSet: { students: userId } }
      );
      console.log("✅ Courses Updated:", updateResult);

      // Save payment record
      const payment = new Payment({
        userId,
        courses: courses.map((course) => ({
          courseId: course._id,
          title: course.title,
        })),
        totalAmount: session.amount_total / 100, // Convert cents to dollars
        paymentStatus: "completed",
        paymentIntentId: session.id,
      });

      await payment.save();
      console.log("✅ Payment Record Saved!");

      // Send payment confirmation email
      sendPaymentDetails(user.email, {
        userName: user.name,
        courseName: courses.map((c) => c.title).join(", "),
        amount: session.amount_total / 100,
        transactionId: session.id,
      });

      console.log("📩 Payment Email Sent to:", user.email);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("❌ Webhook Processing Error:", error.message);
    next(error);
  }
};
