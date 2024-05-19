const Order = require("../models/orderModel");
const Company = require("../models/companyModel");
const addressModel = require("../models/addressModel");
const userModel = require("../models/userModel");
const companyModel = require("../models/companyModel");
const { request, response } = require("express");
const CityCenterModel = require("../models/CityCenterModel");
const fetch = require("node-fetch");
const orderModel = require("../models/orderModel");
const mongoose = require("mongoose");

//palce order controller
exports.placeOrderController = async (req, res) => {
  try {
    const { uid, companyId, sourceId, destinationId, items } = req.body;
    // Calculate totalWeight from items
    const totalWeight = items.reduce((acc, item) => acc + item.weight, 0);
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company Not found",
      });
    }
    // Get city center ID from source pincode
    const totalPrice = totalWeight * company.price;
    // Create the order object
    const order = new Order({
      userId: uid,
      companyId,
      sourceId,
      destinationId,
      status: "Not-Confirmed",
      orderedAt: new Date(),
      price: totalPrice,
      items,
      totalWeight,
    });

    // Save the order to the database
    await order.save();

    res.status(201).json({
      success: true,
      message: "Order initialized successfully",
      order,
    });
  } catch (error) {
    console.error("Error initializing order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// fetching single order
exports.fetchSingleOrderController = async (req, res) => {
  try {
    const { id } = req.params;
    const O = await Order.findById(id);

    if (!O) {
      return res.status(404).json({
        success: false,
        message: "No order found",
      });
    }

    const SourceAddress = await addressModel.findById(O.sourceId);
    const DestiAddress = await addressModel.findById(
      "65ce3c132da91237ce480db3"
    );

    // Get the last object from the 'reached' array
    const lastReach =
      O.reached.length > 0 ? O.reached[O.reached.length - 1] : null;

    let LastReached = null;
    let center = null;
    let data = null;

    if (lastReach) {
      try {
        LastReached = lastReach.centerId;
        center = await CityCenterModel.findOne({ _id: LastReached });

        if (!center) {
          console.error(
            "Center not found for the given LastReached centerId:",
            LastReached
          );
          return res.status(404).json({
            success: false,
            message: "Center not found for the given LastReached centerId",
          });
        }

        const centerPincode = center.pincode;
        console.log("Fetching data for pincode:", centerPincode);
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${centerPincode}`
        );

        if (!response.ok) {
          console.error(
            `Failed to fetch data for pincode ${centerPincode}, status: ${response.status}`
          );
          return res.status(500).json({
            success: false,
            message: `Failed to fetch data for pincode ${centerPincode}`,
          });
        }

        data = await response.json();
        console.log("Fetched data:", data);

        if (!data || data[0].Status !== "Success") {
          console.error("Invalid response data from pincode API:", data);
          return res.status(500).json({
            success: false,
            message: "Invalid response data from pincode API",
          });
        }
      } catch (error) {
        console.error("Error fetching center or pincode data:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching center or pincode data",
          error: error.message,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Order Found",
      O,
      SourceAddress,
      DestiAddress,
      lastReach,
      LastReached,
      center,
      data,
    });
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching order",
      error: error.message,
    });
  }
};

//Fetching all orders of a company
exports.fetchAllOrdersOfCompany = async (req, res) => {
  try {
    const cid = req.user.CompanyId;
    const allCompanyOrders = await Order.find({ companyId: cid });
    const len = allCompanyOrders.length;

    res.status(200).json({
      success: true,
      message: "Orders Found",
      allCompanyOrders,
      len,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching orders of a company",
    });
  }
};

//fetch all orders controller--admin
exports.fetchAllOrdersController = async (req, res) => {
  try {
    const AllOrders = await Order.find();
    res.status(200).json({
      success: true,
      message: "Orders Fetched",
      AllOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching orders",
    });
  }
};

//fetching all orders of a citycenter of a particular company
exports.fetchOrderDestinationController = async (req, res) => {
  try {
    const { did } = req.params;
    const destinationOrders = await Order.find({ destinationId: did });
    res.status(200).json({
      success: true,
      message: "Orders Fetched",
      destinationOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching orders",
    });
  }
};

//city center order contorller
exports.cityCenterOrderController = async (req, res) => {
  try {
    const { ccid } = req.params;
    const orders = await Order.find({ "reached.centerId": ccid });
    res.status(200).json({
      success: true,
      message: "Orders Fetched Successfully",
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching orders",
    });
  }
};

//delete order contorller-admin
exports.deleteOrderAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching orders",
    });
  }
};

//fetch all orders of single user

exports.fetchUserController = async (req, res) => {
  try {
    const uid = await req?.user?._id;
    const userOrders = await Order.find({ userId: uid }).sort({
      orderedAt: -1,
    });

    res.status(200).json({
      success: true,
      uid,
      userOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error in fetching user orders",
    });
  }
};

//cancel order controller

exports.cancelOrderController = async (req, res) => {
  try {
    const orderId = req.params.oid;
    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    order.status = "Cancelled";
    await order.save();

    return res
      .status(200)
      .json({ success: true, message: "Order cancelled successfully", order });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error in cancelling order",
    });
  }
};

//geting admin dashboard details
exports.getAdminDashboardDetails = async (req, res) => {
  try {
    const orders = await Order.find({}).count();
    const users = await userModel.find({}).count();
    const citycenter = await companyModel.find({}).count();
    const result = await Order.aggregate([
      {
        $match: { status: "Delivered" },
      },
      {
        $group: {
          _id: null,
          totalSum: { $sum: "$price" },
        },
      },
    ]);

    const noofusers = await userModel.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          userCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          userCount: 1,
        },
      },
    ]);

    const dayvsuser = [
      ["Day", "Number of User"],
      ...noofusers.map((item) => [
        new Date(item.date).getDate(),
        item.userCount,
      ]),
    ];
    const totalSum = result.length > 0 ? result[0].totalSum : 0;

    const result2 = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$orderedAt" },
            month: { $month: "$orderedAt" },
            day: { $dayOfMonth: "$orderedAt" },
          },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
      {
        $project: {
          _id: 0,
          date: {
            $dateFromParts: {
              year: "$_id.year",
              month: "$_id.month",
              day: "$_id.day",
            },
          },
          orderCount: 1,
        },
      },
    ]);

    // Process the result to fit the required format
    const dayvsorders = [
      ["Day", "Number of Orders"],
      ...result2.map((item) => [
        new Date(item.date).getDate(), // Extract day from date
        item.orderCount,
      ]),
    ];
    const data = {
      orders,
      users,
      citycenter,
      revenue: totalSum,
      dayvsuser,
      dayvsorders,
    };
    res.status(200).json({
      success: true,
      message: "dashboard data fetched Successfully",
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching All data",
    });
  }
};

//get allcity centers for comapny dashboard

exports.getCityCenter = async (req, res) => {
  try {
    const { CompID } = await req.params;
    const centers = await CityCenterModel.find({ company: CompID });
    console.log(CompID);
    res.status(200).json({
      success: true,
      centers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in fetching centers",
    });
  }
};

//delete center controller

exports.deleteCenterController = async (req, res) => {
  try {
    const { cid } = req.params; // Destructure the cid from req.params
    const center = await CityCenterModel.findByIdAndDelete(cid); // Pass cid directly to findByIdAndDelete
    if (!center) {
      // If center is not found
      return res.status(404).json({
        success: false,
        message: "City Center not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "City Center Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error in Deleting Center",
    });
  }
};

//change order status

exports.changeOrderStatus = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);
    order.status = req.body.status;
    await order.save();
    res.status(200).json({
      success: true,
      message: "Status changed successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
};

//company dashboard

exports.companyDashboard = async (req, res) => {
  try {
    const companyId = await req.user.CompanyId;

    // Number of city centers
    const cityCenterCount = await CityCenterModel.countDocuments({
      company: companyId,
    });

    // Total orders
    const totalOrders = (await orderModel.find({ companyId: companyId }))
      .length;

    // Orders with status "Reached"
    const reachedOrdersCount = await Order.countDocuments({
      companyId,
      status: "Reached",
    });

    // Total revenue
    const totalRevenueResult = await Order.aggregate([
      { $match: { companyId: new mongoose.Types.ObjectId(companyId) } },
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } },
    ]);

    const totalRevenue =
      totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      data: {
        cityCenterCount,
        totalOrders,
        reachedOrdersCount,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
