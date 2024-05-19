const { hashPassword } = require("../helpers/authHelper");
const deliveryAgentModel = require("../models/deliveryAgentModel");

exports.registerDeliveryAgentController = async (req, res) => {
  try {
    const { name, email, password, phone, cityCenter } = req.body;
    const mobile = await deliveryAgentModel.findOne({ phone });

    if (mobile) {
      return res.status(409).json({
        success: false,
        message: "Delivery Agent Already Exists Please Login",
      });
    }
    const hashedPassword = await hashPassword(password);
    const deliveryAgent = await new deliveryAgentModel({
      name: name,
      password: hashedPassword,
      phone: phone,
      email: email,
      cityCenter: cityCenter,
    });
    await deliveryAgent.save();
    res.status(201).json({
      success: true,
      message: "Delivery Agent Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//all delivery agent - citycenter access
exports.getAllDeliveryAgent = async (req, res) => {
  try {
    const users = await deliveryAgentModel.find({ cityCenter: req.params.id });

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Delivery Agent Not found",
      });
    }
    const agentsWithOrderCount = users.map(agent => {
      const deliveredOrderCount = agent.ordersDelivered.length;
      return {
        ...agent._doc,
        deliveredOrderCount,
      };
    });

    res.status(200).json({
      success: true,
      message: "Delivery Agents fetched successfully",
      users: agentsWithOrderCount,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//delete delivery agent - citycenter access
exports.deleteDeliveryAgent = async (req, res) => {
  try {
    await deliveryAgentModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Delivery Agent Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

