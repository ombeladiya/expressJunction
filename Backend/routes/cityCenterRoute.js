const express = require("express");
const {
  cityCenterRegisterController,
  addcitycenterreached,
} = require("../controllers/cityCenterAuthController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", requireSignIn, cityCenterRegisterController);
router.post(
  "/addparcel/:id/:cityid",
  requireSignIn,
  isAdmin("city"),
  addcitycenterreached
);

module.exports = router;
