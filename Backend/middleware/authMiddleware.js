const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");
const companyModel = require("../models/companyModel");

exports.requireSignIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }
    const decode = await JWT.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decode._id);
    if (user) {
      req.user = user;
    } else {
      return res.status(401).json({ success: false, message: "Access denied" });
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Access denied" });
  }
};

// ADMIN ACCESS

exports.isAdmin = (...roles) => {
  try {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(401).json({
          success: false,
          message: "UnAuthorized Access",
        });
      }
      next();
    };
  } catch (error) {
    console.log(error);
  }
};
