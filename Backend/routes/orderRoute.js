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
  deliverOrdersOfAgent,
  fetchAllOrdersOfAgent,
  getCityCenter,
  deleteCenterController,
  changeOrderStatus,
  companyDashboard,
} = require("../controllers/orderController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");
const { checkout } = require("../controllers/PaymentController");

const router = express.Router();

//Place Order
router.post("/place-order", requireSignIn, placeOrderController);

//Fetch single product
router.get("/fetchOrder/:id", requireSignIn, fetchSingleOrderController);

//fetch all products of a single
router.get("/fetchcompanyorders", requireSignIn, fetchAllOrdersOfCompany);

//fetch all order of a user
router.get("/fetchhh", requireSignIn, fetchUserController);

//canceling single order user
router.get("/cancelOrder/:oid", requireSignIn, cancelOrderController);

//fetch all orders
router.get(
  "/fetchallorders",
  requireSignIn,
  isAdmin("admin"),
  fetchAllOrdersController
);

//fetch orders by destination
router.get("/fetchorderdest/:did", fetchOrderDestinationController);

//fetch orders of a city center
router.get("/fetchordercc/:ccid", requireSignIn, isAdmin('city'), cityCenterOrderController);

//delete order
router.delete(
  "/deleteorder/:id",
  requireSignIn,
  isAdmin("admin"),
  deleteOrderAdmin
);

//fetch orders of a city center
router.get(
  "/admindata",
  requireSignIn,
  isAdmin("admin"),
  getAdminDashboardDetails
);

//fetch all centres of a company
router.get("/getCenter/:CompID", requireSignIn, getCityCenter);

//delete city center
router.delete("/deleteCenter/:cid", deleteCenterController);

// change order status
router.post(
  "/change-status/:id",
  requireSignIn,
  isAdmin("company"),
  changeOrderStatus
);

// company dashboard
router.get(
  "/dashboardData",
  requireSignIn,
  isAdmin("company"),
  companyDashboard
);

// deliver order-agent access
router.post(
  "/deliver/:id/:agentid",
  requireSignIn,
  isAdmin("agent"),
  deliverOrdersOfAgent
);

//get all agent's orders- citycenter access
router.get("/orders/:id", fetchAllOrdersOfAgent);


//payment 

router.post('/checkout', requireSignIn, checkout);
module.exports = router;
