const express = require("express");
const router = express.Router();

const {
  getProductbyId,
  createProduct,
  getProduct,
  photo,
  removeProduct,
  updateProduct,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/productController");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authController");
const { getUserbyId } = require("../controllers/userController");

// All parameters
router.param("userId", getUserbyId);
router.param("productId", getProductbyId);

// Actual routes

// Create
router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// Read Route
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

// Delete Route
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeProduct
);

// Update Route
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// Listing Route
router.get("/products", getAllProducts)
// Alternative to get all distinct categories
router.get("/products/categories", getAllUniqueCategories)

module.exports = router;
