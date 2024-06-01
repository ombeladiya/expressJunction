const express = require("express");
const {
  registerDeliveryAgentController,
  getAllDeliveryAgent,
  deleteDeliveryAgent,
} = require("../controllers/deliveryAgentsController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

//register delivery agents POST
router.post("/register", requireSignIn, isAdmin('city'), registerDeliveryAgentController);

//get all agents - citycenter access
router.get("/agents/:id", requireSignIn, isAdmin('city'), getAllDeliveryAgent);

//delete all agents - citycenter access
router.delete("/agent/:id", requireSignIn, isAdmin('city'), deleteDeliveryAgent);

module.exports = router;
