import Stripe from "stripe";
import Payment from "../models/Payment.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ 1️⃣ Create Stripe Checkout Session
export const createCheckoutSession = async (req, res) => {
  try {
    const { cartItems } = req.body; // Get courses from frontend
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "No courses selected" });
    }

    // Format line items for Stripe
    const lineItems = cartItems.map((course) => ({
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
      metadata: { userId: req.user._id, courses: JSON.stringify(cartItems) },
    });

    res.json({ id: session.id }); // Send session ID to frontend
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// ✅ 2️⃣ Handle Stripe Webhooks (Confirm Payment)
export const webhookHandler = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const courses = JSON.parse(session.metadata.courses);

      // Save payment to database
      const payment = new Payment({
        userId,
        courses: courses.map((course) => ({
          courseId: course._id,
          title: course.title,
          price: course.price,
        })),
        totalAmount: session.amount_total / 100, // Convert cents to dollars
        paymentStatus: "completed",
        paymentIntentId: session.id,
      });

      await payment.save();
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Stripe Webhook Error:", error);
    res.status(400).json({ message: "Webhook error", error });
  }
};
