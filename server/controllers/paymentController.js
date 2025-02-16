import Stripe from "stripe";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import sendPaymentDetails from "../services/sendPaymentDetails .js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res, next) => {
  try {
    const courseData = req.body;
    console.log("🔹 Course Data received on backend:", courseData);

    if (!courseData || courseData.length === 0) {
      return res.status(400).json({ message: "No courses selected" });
    }

    // Format line items for Stripe
    const lineItems = courseData.map((course) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: course.title,
        },
        unit_amount: Math.round(course.price * 100), // Convert to cents
      },
      quantity: 1,
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
        userId: req.user._id,
        courses: JSON.stringify(
          courseData.map((course) => ({
            _id: course._id, // Only include the course ID
            title: course.title, // Only include the course title
          }))
        ),
      },
    });

    // Return the session URL to the frontend
    res.json({ url: session.url }); // ✅ Send the Stripe Checkout URL
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    next(error);
  }
};

export const webhookHandler = async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const courses = JSON.parse(session.metadata.courses); // Array of course IDs and titles

      // Save payment to database
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

      // Enroll the user in the courses
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const courseIds = courses.map((course) => course._id);

      // Add course IDs to the user's `coursesEnrolled` array
      user.coursesEnrolled = [
        ...new Set([...user.coursesEnrolled, ...courseIds]),
      ];
      await user.save();

      // Add the user to the `students` field of each course
      await Course.updateMany(
        { _id: { $in: courseIds } },
        { $addToSet: { students: userId } }
      );

      // Send the payment details email
      const paymentInfo = {
        userName: user.name, // The user’s name
        courseName: courses.map((course) => course.title).join(", "), // Course titles
        amount: session.amount_total / 100, // Total amount in dollars
        transactionId: session.id, // Stripe transaction ID
      };

      sendPaymentDetails(user.email, paymentInfo); // Send email with payment info
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Stripe Webhook Error:", error);
    next(error);
  }
};
