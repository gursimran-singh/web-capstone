const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var apiRouter = require("./routes/indexRouteAPI");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", apiRouter);

module.exports = app;
