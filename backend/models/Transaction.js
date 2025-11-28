// backend/models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount must be positive"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      default: "expense",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "upi", "bank", "other"],
      default: "other",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
