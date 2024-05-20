const { hashPassword } = require("../helpers/authHelper");
const CityCenter = require("../models/CityCenterModel");
const Company = require("../models/companyModel");
const Order = require("../models/orderModel");

exports.cityCenterRegisterController = async (req, res) => {
  try {
    const { companyId, email, password, pincode, deliverAgentsId } = req.body;

    const existingCityCenter = await CityCenter.findOne({ pincode });
    const comp = await Company.findById(companyId);

    if (!comp) {
      return res.status(404).json({
        success: false,
        message: "Company Not Found Please check id",
      });
    }

    if (existingCityCenter) {
      return res.status(200).json({
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
      deliveryAgentsID: deliverAgentsId,
    }).save();

    res.status(201).json({
      success: true,
      message: "City Center added successfully",
      cityCenter,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in CityCenter Registration",
    });
  }
};


exports.addcitycenterreached = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order.status == 'Confirmed') {
      order.status = 'In-Transit';
    }
    order.reached.push({ centerId: req.params.cityid });

    await order.save();

    res.status(200).json({
      success: true,
      message: "Parcel Recieved successfully"
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}