import express from "express";
import Order from "../models/Order.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { auth } from "../middleware/tokenMiddleware.js";

const router = express.Router();

// Create a new order
router.post("/create", async (req, res) => {
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
    res
      .status(500)
      .json({ message: "Failed to place order", error: err.message });
  }
});

// Get all orders
router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate("items.product");
    res.json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: err.message });
  }
});

// Get a specific order by ID
router.get("/:orderId", auth, isAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "items.product"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: err.message });
  }
});

// Delete an order by ID
router.delete("/:orderId", auth, isAdmin, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete order", error: err.message });
  }
});

export default router;
