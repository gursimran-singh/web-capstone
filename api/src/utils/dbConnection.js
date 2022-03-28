const dynamoose = require("dynamoose");
const AWS = require("aws-sdk");


const credentials = new AWS.SharedIniFileCredentials({ profile: "capstone" });
dynamoose.aws.sdk.config.credentials = credentials;
dynamoose.aws.sdk.config.update({
    "region": "ca-central-1"
});