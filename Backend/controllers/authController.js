const userModel = require("../models/userModel.js");
const { hashPassword, comparePassword } = require("../helpers/authHelper.js");
const JWT = require("jsonwebtoken");
const sendMail = require("../utils/sendEmail.js");
//Register Controller

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    //check existing user

    const existingUserm = await userModel.findOne({ mobile });
    const existingUsere = await userModel.findOne({ email });
    if (existingUserm || existingUsere) {
      return res.status(409).json({
        success: true,
        message: "User already registered please login",
      });
    } else {
      // const hashedPassword = await hashPassword(password);
      const user = await new userModel({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        role: "user",
      }).save();
      //JWT generation
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

      res.cookie("token", token, {
        maxAge: 259200000,
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        user,
      });
      sendMail(user.email, "Express-Junction", "", user.name);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error in user registartion",
    });
  }
};

// login controller

exports.loginController = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const existingUser = await userModel.findOne({ email: mobile });

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // const match = await comparePassword(password, existingUser.password);
    if (password != existingUser.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    //JWT generation
    const token = await JWT.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("token", token, {
      maxAge: 259200000,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User Login Successful",
      user: existingUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error in user login" });
  }
};

exports.getUserDetails = async (req, res, next) => {
  const user = await userModel.findById(req.user._id).select("-password");

  res.status(200).json({
    success: true,
    user,
  });
};

//logout user
exports.logoutUser = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

//getting all user--admin
exports.getAllUsers = async (req, res, next) => {
  const users = await userModel.find().select("-password");

  res.status(200).json({
    success: true,
    users,
  });
};

//delete user--admin
exports.deleteUser = async (req, res, next) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};

//create -user -ADmin
exports.CreateUSerController = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    //check existing user
    const existingUserm = await userModel.findOne({ mobile });
    const existingUsere = await userModel.findOne({ email });

    if (existingUserm || existingUsere) {
      return res.status(409).json({
        success: true,
        message: "User already registered!!",
      });
    }
    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
      mobile: mobile,
      role: "user",
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User Creatred Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in user registartion",
    });
  }
};

//change user role--admin
exports.changeUserRole = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);
    user.role = req.body.role;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Role changed successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};
