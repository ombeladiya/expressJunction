const express = require("express");
const {
  registerController,
  loginController,
  logoutUser,
  getUserDetails,
} = require("../controllers/authController");
const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

//routing
//USER
//POST || Register User
router.post("/register", registerController);

//POST || Login User

router.post("/login", loginController);

router.get("/logout", logoutUser);
router.get("/me", requireSignIn, getUserDetails);

module.exports = router;
