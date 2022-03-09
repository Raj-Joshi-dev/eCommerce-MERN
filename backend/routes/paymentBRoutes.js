const express = require("express");
const router = express.Router();
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authController");
const { getToken, processPayment } = require("../controllers/paymentb");

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);
router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
