const express = require("express");
const router = express.Router();
const {
  isSignedIn,
  isAuthenticated,
} = require("../controllers/authController");
const { getToken, processPayment } = require("../controllers/paymentb");
const { getUserbyId } = require("../controllers/userController");
router.param("userId", getUserbyId);

router.get("/payment/gettoken/:userId", isSignedIn, isAuthenticated, getToken);

router.post(
  "/payment/braintree/:userId",
  isSignedIn,
  isAuthenticated,
  processPayment
);

module.exports = router;
