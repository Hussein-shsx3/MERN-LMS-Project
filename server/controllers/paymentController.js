import Stripe from "stripe";
import Payment from "../models/Payment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
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
      metadata: { userId: req.user._id, courses: JSON.stringify(courseData) },
    });

    // Return the session URL to the frontend
    res.json({ url: session.url }); // ✅ Send the Stripe Checkout URL
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const webhookHandler = async (req, res) => {
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
