const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var AWS = require("aws-sdk");
AWS.config.update({
  region: "ca-central-1", // replace with your region in AWS account
});
var credentials = new AWS.SharedIniFileCredentials({ profile: "capstone" });
AWS.config.credentials = credentials;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/food", require("./routes/indexRouteAPI"));
app.use("/api/category", require("./routes/categoryRouteAPI"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/payment", require("./routes/paymentRouteAPI"));
app.use("/api/order", require("./routes/orderRouteAPI"));

module.exports = app;
