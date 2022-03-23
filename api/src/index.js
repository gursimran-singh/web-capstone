const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var AWS = require("aws-sdk");
AWS.config.update({
  region: "ca-central-1", // replace with your region in AWS account
});
var credentials = new AWS.SharedIniFileCredentials({ profile: "capstone" });
AWS.config.credentials = credentials;

// require('./models/item');
var apiRouter = require("./routes/indexRouteAPI");
var categoriesRouter = require("./routes/categoryRouteAPI");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/food", apiRouter);
app.use("/api/category", categoriesRouter);

module.exports = app;
