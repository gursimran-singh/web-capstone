const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/', (req, res) => {
    res.status(200).json({
        message: "this is success message"
    });
})

module.exports = app;