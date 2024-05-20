const mongoose = require("mongoose");

const CityCenterSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
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
  deliveryAgentsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "deliveryagent",
    },
  ],
});

module.exports = mongoose.model("CityCenter", CityCenterSchema);
