const express = require("express");
const {
  companyListingController,
  fetchUsersController,
  fetchCompanyController,
} = require("../controllers/searchCompanyController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

//company Listing
router.post("/company-listing", requireSignIn, companyListingController);

//fetch all users
router.get("/fetch-users", requireSignIn, isAdmin("admin"), fetchUsersController);

//fetch all companies
router.get("/fetch-comapny", fetchCompanyController);

module.exports = router;
