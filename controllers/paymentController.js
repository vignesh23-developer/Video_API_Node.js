const Payment = require("../models/Payment");

// SAVE PAYMENT
exports.savePayment = async (req, res) => {
  try {
    const { userId, paymentType, razorpayPaymentId, amount } = req.body;

    if (!userId || !amount) {
      return res.status(400).json({
        success: false,
        message: "userId and amount required",
      });
    }

    const payment = await Payment.create({
      user_id: userId,
      paymentType,
      razorpayPaymentId,
      amount,
      status: "success",
    });

    return res.status(201).json({
      success: true,
      message: "Payment saved",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// CHECK PAYMENT STATUS
exports.getPaymentStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    const payment = await Payment.findOne({
      user_id: userId,
      status: "success",
    });

    return res.status(200).json({
      success: true,
      hasPaid: !!payment,
      data: payment || null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};