import express from "express";
import Order from "../models/Order.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { auth } from "../middleware/tokenMiddleware.js";

const router = express.Router();

// Create a new order
router.post("/", async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      items,
      paymentMethod,
      totalAmount,
      shippingFee,
    } = req.body;

    const newOrder = new Order({
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      items,
      paymentMethod,
      totalAmount,
      shippingFee,
    });

    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully", order: savedOrder });
  } catch (err) {
    next(err);
  }
});

// Get all orders
router.get("/", auth, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find().populate("items.id");
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// Get a specific order by ID
router.get("/:orderId", auth, isAdmin, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "items.product"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// Delete an order by ID
router.delete("/:orderId", auth, isAdmin, async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
