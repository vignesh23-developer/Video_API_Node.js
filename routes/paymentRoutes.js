const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");

router.post("/save", paymentController.savePayment);
router.get("/status/:userId", paymentController.getPaymentStatus);

module.exports = router;