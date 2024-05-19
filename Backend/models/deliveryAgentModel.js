const mongoose = require("mongoose");

const deliveryAgentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  cityCenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "citycenter",
    required: true
  },
  ordersDelivered: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order"
    }
  ],
});

module.exports = mongoose.model("deliveryagents", deliveryAgentSchema);
