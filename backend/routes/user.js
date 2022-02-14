const express = require("express");
const router = express.Router();

const {
  getUserbyId,
  getUser,
  getAllUsers,
  updateUser,
  userPurchaseList,
} = require("../controllers/userController");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
} = require("../controllers/authController");

router.param("userId", getUserbyId);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get(
  "/user/orders/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

// router.get("/users", getAllUsers)

module.exports = router;
