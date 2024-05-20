const companyMOdel = require("../models/companyModel.js");
const { hashPassword, comparePassword } = require("../helpers/authHelper.js");
const CityCenter = require("../models/CityCenterModel");
// const Order = require("../models/OrderModel");
const JWT = require("jsonwebtoken");
const orderModel = require("../models/orderModel.js");

//register controller
exports.companyRegisterController = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      logo,
      regNo,
      address,
      mobile,
      price,
      // pincodes,
      accountNo,
      IFSC,
    } = req.body;

    // let stringArray = pincodes.split(',');
    // let intArray = stringArray.map(Number);
    const existingUser = await companyMOdel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: true,
        message: "Company already registered please login",
      });
    } else {
      const hashedPassword = await hashPassword(password);
      const comp = await new companyMOdel({
        name,
        password: hashedPassword,
        email,
        logo,
        regNo,
        address,
        mobile,
        price,
        // pincodes: intArray,
        accountNo,
        IFSC,
      }).save();

      res.status(201).json({
        success: true,
        message: "Company Registered successfully",
        comp,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server error in company registration",
    });
  }
};

//company login contorller

exports.companyLoginController = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const existingCompany = await companyMOdel.findOne({ email: mobile });

    if (!existingCompany) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const match = await comparePassword(password, existingCompany.password);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Username or Password",
      });
    }

    const token = JWT.sign(
      { id: existingCompany._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("token", token, {
      maxAge: 259200000,
      httpOnly: true,
    });

    existingCompany.role = "company";

    res.status(200).json({
      success: true,
      message: "Company Login Successful",
      existingCompany,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in company login",
    });
  }
};

//company rating

exports.companyRatingController = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { rating, comment } = req.body;
    // Find the company by its ID
    const company = await companyMOdel.findById(companyId);

    if (reviews.length === 0) {
      return 0; // If there are no reviews yet, return 0
    }

    let totalRating = 0;
    reviews.forEach((review) => {
      totalRating += review.rating;
    });

    const avgRating = totalRating / reviews.length;
    // Add the new review
    company.reviews.push({ rating, comment });
    company.avgRating = avgRating;
    // Save the company
    await company.save();

    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in updating rating",
    });
  }
};

//company delete - Admin

exports.DeleteCompany = async (req, res) => {
  try {
    await companyMOdel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Company Deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in updating rating",
    });
  }
};
