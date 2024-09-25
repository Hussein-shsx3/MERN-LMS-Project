import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  street: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  phone: String,
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
    },
  ],
  paymentMethod: String,
  totalAmount: Number,
  shippingFee: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
