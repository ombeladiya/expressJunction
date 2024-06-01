const { hashPassword } = require("../helpers/authHelper");
const CityCenter = require("../models/CityCenterModel");
const Company = require("../models/companyModel");
const user = require("../models/userModel");
const Order = require("../models/orderModel");

exports.cityCenterRegisterController = async (req, res) => {
  try {
    const { email, password, pincode } = req.body;


    const companyId = await req.user?.CompanyId;
    const existingCityCenter = await CityCenter.findOne({ pincode, company: companyId });
    const comp = await Company.findOne({ _id: companyId });

    if (!comp) {
      return res.status(404).json({
        success: false,
        message: "Company Not Found Please check id",
      });
    }

    if (existingCityCenter) {
      return res.status(409).json({
        success: false,
        message: "City Center Already Exists Please Login",
      });
    }
    const hashedPassword = await hashPassword(password);

    // Update company's pincode array
    comp.pincodes.push(pincode);
    await comp.save();

    const cityCenter = await new CityCenter({
      company: companyId,
      email: email,
      password: hashedPassword,
      pincode: pincode,
    }).save();

    res.status(201).json({
      success: true,
      message: "City Center added successfully",
      cityCenter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addcitycenterreached = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order.status == "Confirmed") {
      order.status = "In-Transit";
    }
    order.reached.push({ centerId: req.params.cityid });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Parcel Recieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
