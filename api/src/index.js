const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//**********************aws*************************************
var AWS = require("aws-sdk");
AWS.config.update({
  region: "ca-central-1", // replace with your region in AWS account
});
var credentials = new AWS.SharedIniFileCredentials({ profile: "capstone" });
AWS.config.credentials = credentials;

var apiRouter = require("./routes/indexRouteAPI");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRouter);

module.exports = app;
