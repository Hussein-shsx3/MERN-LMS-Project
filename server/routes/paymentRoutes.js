import express from "express";
import {
  createCheckoutSession,
  webhookHandler,
} from "../controllers/paymentController.js";
import { auth } from "../middleware/tokenMiddleware.js"; // Protect routes

const router = express.Router();

// Route to create a Stripe Checkout session (PROTECTED)
router.post("/create-checkout-session", auth, createCheckoutSession);

// Stripe Webhook for handling payment updates (No auth needed)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  webhookHandler
);

export default router;
