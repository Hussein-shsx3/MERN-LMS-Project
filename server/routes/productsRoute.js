import express from "express";
import Product from "../models/Product.js";
import { isAdmin } from "../middleware/adminMiddleware.js";
import { auth } from "../middleware/tokenMiddleware.js";

const router = express.Router();

//* Create a new product
router.post("/", isAdmin, auth, async (req, res, next) => {
  try {
    const {
      name,
      description,
      images,
      category,
      subCategory,
      price,
      sizes,
      isBestseller,
    } = req.body;
    const newProduct = new Product(
      name,
      description,
      images,
      category,
      subCategory,
      price,
      sizes,
      isBestseller
    );
    await newProduct.save();
    res.status(201).json({ message: "Product created successfully" });
  } catch (err) {
    next(err);
  }
});

//* Get all products
router.get("/", isAdmin, auth, async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
});

//* Get a single product by ID
router.get("/:id", isAdmin, auth, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

//* Update a product by ID
router.put("/:id", isAdmin, auth, async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (err) {
    next(err);
  }
});

//* Delete a product by ID
router.delete("/:id", isAdmin, auth, async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
