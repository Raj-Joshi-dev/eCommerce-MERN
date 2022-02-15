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

const { updateStock } = require("../controllers/productController");
const {
  getOrderById,
  createOrder,
  getAllOrders,
} = require("../controllers/orderController");

// Params
router.param("userId", getUserbyId);
router.param("orderId", getOrderById);

// Actual Routes
// Create
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

// Read
router.get(
  "/order/all/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

module.exports = router;
