const express = require("express");
const {
  companyRegisterController,
  companyLoginController,
  companyRatingController,
  companyDashboard,
} = require("../controllers/companyAuthController");
const { body } = require("express-validator");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

//Routing
//POST || Register Company

router.post("/register", companyRegisterController);

//POST || Company Login

router.post("/login", companyLoginController);

//POST || Company Ratings

router.post("/rating/:cid", companyRatingController);

// company dashboard

module.exports = router;
