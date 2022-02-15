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
const {} = require("../controllers/orderController");
