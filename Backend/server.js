const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config({ path: "./my.env" });
const authRoutes = require("./routes/authRoutes.js");
const companyRoutes = require("./routes/companyRoutes.js");
const cityCenterRoute = require("./routes/cityCenterRoute.js");
const searchCompanyRoute = require("./routes/searchCompanyRoute.js");
const orderRoute = require("./routes/orderRoute.js");
const addressRoute = require("./routes/addressRoute.js");
const deliveryAgentsRoute = require("./routes/deliveryAgentsRoute.js");
const cors = require("cors");
const path = require('path');
const cookieParser = require("cookie-parser");
//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/auth/company", companyRoutes);
app.use("/api/v1/auth/company/cityCenter", cityCenterRoute);
app.use("/api/v1/user/search", searchCompanyRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/address", addressRoute);
app.use("/api/v1/deliveryAgent", deliveryAgentsRoute);


app.use(express.static(path.join(__dirname, "./dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./dist/index.html"));
});

//connection message
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
