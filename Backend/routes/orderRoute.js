const express = require("express");
const {
  placeOrderController,
  fetchSingleOrderController,
  fetchAllOrdersOfCompany,
  fetchAllOrdersController,
  fetchOrderDestinationController,
  cityCenterOrderController,
  fetchUserController,
  cancelOrderController,
} = require("../controllers/orderController");
const { requireSignIn } = require("../middleware/authMiddleware");

const router = express.Router();

//Place Order
router.post("/place-order", placeOrderController);

//Fetch single product
router.get("/fetchOrder/:id", fetchSingleOrderController);

//fetch all products of a single
router.get("/fetchcompanyorders/:cid", fetchAllOrdersOfCompany);

//fetch all orders
router.get("/fetchallorders", fetchAllOrdersController);

//fetch orders by destination
router.get("/fetchorderdest/:did", fetchOrderDestinationController);

//fetch orders of a city center
router.get("/fetchordercc/:ccid", cityCenterOrderController);

router.get("/fetchhh", requireSignIn, fetchUserController);

//cancel order
router.get("/cancelOrder/:oid", cancelOrderController);

module.exports = router;
