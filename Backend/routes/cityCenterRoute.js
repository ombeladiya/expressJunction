const express = require("express");
const {
  cityCenterRegisterController,
} = require("../controllers/cityCenterAuthController");
const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", requireSignIn, cityCenterRegisterController);

module.exports = router;
