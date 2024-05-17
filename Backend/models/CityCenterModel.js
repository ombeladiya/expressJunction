const mongoose = require("mongoose");

const CityCenterSchema = new mongoose.Schema({
  company: {
    type: mongoose.Types.ObjectId,
    ref: "company",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  deliveryAgentsID: [
    {
      type: mongoose.Types.ObjectId,
      ref: "deliveryagents"
    },
  ],
});

module.exports = mongoose.model("cityCenter", CityCenterSchema);
