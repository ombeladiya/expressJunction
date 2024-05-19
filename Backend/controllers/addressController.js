const addressModel = require("../models/addressModel");
const userModel = require("../models/userModel");

exports.setAddressController = async (req, res) => {
  try {
    const {
      name,
      phoneNo,
      email,
      city,
      district,
      state,
      country,
      pincode,
      landmark,
    } = req.body;

    const address = await new addressModel({
      name: name,
      phoneNo: phoneNo,
      email: email,
      city: city,
      district: district,
      state: state,
      country: country,
      pincode: pincode,
      landmark: landmark,
    }).save();

    res.status(200).json({
      success: true,
      message: "Address registered successfully",
      id: address._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in saving address",
      error,
    });
  }
};


exports.getuserAddressController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.user._id }).select("address");
    const addressIds = user.address;
    if (addressIds && addressIds.length > 0) {
      const addresses = await addressModel.find({ '_id': { $in: addressIds } });
      res.status(200).json({
        success: true,
        address: addresses
      });
    } else {
      res.status(200).json({
        success: true,
        address: []
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in saving address",
      error,
    });
  }
};

exports.adduseraddressController = async (req, res) => {
  try {
    const {
      name,
      phoneNo,
      email,
      city,
      district,
      state,
      country,
      pincode,
      landmark,
    } = req.body;

    const address = await new addressModel({
      name: name,
      phoneNo: phoneNo,
      email: email,
      city: city,
      district: district,
      state: state,
      country: country,
      pincode: pincode,
      landmark: landmark,
    }).save();

    const user = await userModel.findById({ _id: req.user._id });
    user.address.push(address._id);
    user.save();
    res.status(200).json({
      success: true,
      message: "Address registered successfully",
      id: address._id,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in saving address",
      error,
    });
  }
};


exports.deleteAddress = async (req, res) => {
  try {

    await addressModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Address Deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error in saving address",
    });
  }
};