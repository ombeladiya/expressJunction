const express = require("express");
const {
  companyRegisterController,
  companyLoginController,
  companyRatingController,
  companyDashboard,
  DeleteCompany,
} = require("../controllers/companyAuthController");
const { body } = require("express-validator");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

//Routing
//POST || Register Company
router.post(
  "/register",
  requireSignIn,
  isAdmin("admin"),
  companyRegisterController
);

//POST || Company Login
router.post("/login", companyLoginController);

//POST || Company Ratings
router.post("/rating/:cid", companyRatingController);

//delete company-admin
router.delete("/delete/:id", requireSignIn, isAdmin("admin"), DeleteCompany);

module.exports = router;
