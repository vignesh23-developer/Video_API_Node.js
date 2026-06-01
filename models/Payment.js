const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
      index: true,
    },
    paymentType: {
      type: String,
      default: "razorpay",
    },
    razorpayPaymentId: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed", "pending"],
      default: "success",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);