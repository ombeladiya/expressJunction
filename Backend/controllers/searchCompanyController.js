const company = require("../models/companyModel");
const Distance = require("pincode-distance-calculator");
const User = require("../models/userModel");
const CityCenter = require("../models/CityCenterModel");
const CityCenterModel = require("../models/CityCenterModel");

exports.companyListingController = async (req, res) => {
  try {
    const { from, to, weight } = req.body;
    const companies = await company.find({ pincodes: { $all: [to, from] } });
    if (!companies) {
      return res.status(404).json({
        success: false,
        message: "No Delivery Facilities to source or destination at this time",
      });
    }

    const totalPriceByCompany = companies.map((company) => {
      const price = company.price;
      const totalPrice = Math.round(price * weight);
      return {
        companyId: company._id,
        companyName: company.name,
        companyLogo: company.logo,
        totalPrice,
      };
    });

    res.status(200).json({ success: true, totalPriceByCompany });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error in Fetching Companies",
    });
  }
};

//fetch all users controller

exports.fetchUsersController = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users Fetched Successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error in Fetching users",
    });
  }
};

//fetch all companies
exports.fetchCompanyController = async (req, res) => {
  try {
    const companies = await company.find();
    res.status(200).json({
      success: true,
      message: "Companies Fetched successfully",
      companies,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error in fetching companies",
    });
  }
};

//fetch all city center
exports.fetchAllCityCentersController = async (req, res) => {
  try {
    const ccs = await CityCenterModel.find({});
    const ccsl = ccs.length;
    res.status(200).json({
      success: true,
      message: "City Centers Fetched Successfully",
      noOfCityCenter: ccsl,
      ccs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in fetching CityCenter",
    });
  }
};
