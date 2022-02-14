const express = require("express");
const router = express.Router();

// custom imports
const {
  getCategorybyId,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  removeCategory,
} = require("../controllers/categoryController");

const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authController");
const { getUserbyId } = require("../controllers/userController");

// params
router.param("userId", getUserbyId);
router.param("categoryId", getCategorybyId);

// actual router goes here

// create routes
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// read routes
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

// update routes
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// delete routes
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  removeCategory
);

module.exports = router;
