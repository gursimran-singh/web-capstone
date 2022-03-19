const app = require("./src/index");
require("dotenv").config();

if (process.env.MODE == "local") {
  //**********************aws*************************************
  var AWS = require("aws-sdk");
  AWS.config.update({
    region: "ca-central-1", // replace with your region in AWS account
  });
  var credentials = new AWS.SharedIniFileCredentials({ profile: "capstone" });
  AWS.config.credentials = credentials;
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
} else {
  const awsServerlessExpress = require("aws-serverless-express");
  const server = awsServerlessExpress.createServer(app);
  exports.handler = (event, context) => {
    return awsServerlessExpress.proxy(server, event, context);
  };
}
