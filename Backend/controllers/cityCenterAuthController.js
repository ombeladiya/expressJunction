const { hashPassword } = require("../helpers/authHelper");
const CityCenter = require("../models/CityCenterModel");
const Company = require("../models/companyModel");
const user = require("../models/userModel");

exports.cityCenterRegisterController = async (req, res) => {
  try {
    const { email, password, pincode } = req.body;

    const existingCityCenter = await CityCenter.findOne({ pincode });
    const companyId = await req.user?.CompanyId;

    const comp = await Company.findOne({ _id: companyId });

    console.log(req.user.CompanyId);

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
    }).save();

    res.status(201).json({
      success: true,
      message: "City Center added successfully",
      cityCenter,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error in CityCenter Registration",
    });
  }
};
