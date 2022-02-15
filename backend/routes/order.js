const express = require("express");
const router = express.Router();
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authController");
const {
  getUserbyId,
  pushOrderInPurchaseList,
} = require("../controllers/userController");

const {} = require("../controllers/productController");
const {getOrderById} = require("../controllers/orderController");

// Params
router.param("userId", getUserbyId)
router.param("orderId", getOrderById)


// Actual Routes

// Create

// Read

module.exports = router;