const express = require("express");
const {
  placeOrderController,
  fetchSingleOrderController,
  fetchAllOrdersOfCompany,
  fetchAllOrdersController,
  fetchOrderDestinationController,
  cityCenterOrderController,
  deleteOrderAdmin,
  getAdminDashboardDetails,
  fetchUserController,
  cancelOrderController,
} = require("../controllers/orderController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

//Place Order
router.post("/place-order", requireSignIn, placeOrderController);

//Fetch single product
router.get("/fetchOrder/:id", requireSignIn, fetchSingleOrderController);

//fetch all products of a single
router.get("/fetchcompanyorders/:cid", requireSignIn, fetchAllOrdersOfCompany);

//fetch all order of a user
router.get("/fetchhh", requireSignIn, fetchUserController);

//canceling single order user
router.get("/cancelOrder/:oid", requireSignIn, cancelOrderController);

//fetch all orders
router.get("/fetchallorders", requireSignIn, isAdmin('admin'), fetchAllOrdersController);

//fetch orders by destination
router.get("/fetchorderdest/:did", fetchOrderDestinationController);

//fetch orders of a city center
router.get("/fetchordercc/:ccid", cityCenterOrderController);

//delete order
router.delete("/deleteorder/:id", requireSignIn, isAdmin('admin'), deleteOrderAdmin);

//fetch orders of a city center
router.get("/admindata", requireSignIn, isAdmin('admin'), getAdminDashboardDetails);
module.exports = router;
