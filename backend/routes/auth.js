var express = require("express");
const router = express.Router();
const {
  signout,
  signup,
  signin,
  isSignedIn,
} = require("../controllers/authController");
const { check } = require("express-validator");

router.post(
  "/signup",
  [
    check("name", "Name should be atleast 3 character").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be atleast 3 characters").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password field is required").isLength({ min: 3 }),
  ],
  signin
);

router.get("/signout", signout);

// router.get("/test", isSignedIn, (req, res) => {
//     res.json(req.auth);
// });

module.exports = router;
