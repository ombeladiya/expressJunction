const express = require("express");
const { setAddressController, getuserAddressController, adduseraddressController, deleteAddress } = require("../controllers/addressController");
const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/set-address", requireSignIn, setAddressController);
router.get("/get-address", requireSignIn, getuserAddressController);
router.post("/add-address", requireSignIn, adduseraddressController);
router.delete("/delete/:id", requireSignIn, deleteAddress);
module.exports = router;
