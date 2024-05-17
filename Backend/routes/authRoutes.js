const express = require("express");
const {
  registerController,
  loginController,
  logoutUser,
  getUserDetails,
  deleteUser,
  CreateUSerController,
  changeUserRole,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

//routing
//USER
//POST || Register User
router.post("/register", registerController);

//POST || Login User
router.post("/login", loginController);

router.get("/logout", logoutUser);
router.get("/me", requireSignIn, getUserDetails);
router.delete("/delete/:id", requireSignIn, isAdmin('admin'), deleteUser);
router.post("/create", requireSignIn, isAdmin('admin'), CreateUSerController);
router.post("/change-role/:id", requireSignIn, isAdmin('admin'), changeUserRole);
module.exports = router;
