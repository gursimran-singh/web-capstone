const order = require("../models/order");
var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

const createOrder = (req, res) => {
  order
    .createOrder(req.body)
    .then((order) => {
      res.json({ order: order }).status(200);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

const getAllOrders = (req, res) => {
  try {
    const params = {
      TableName: "order",
    };
    docClient.scan(params, (err, orders) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        return res.status(200).json(orders);
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

let putOrder = (req, res) => {
  try {
    var params1 = {
      TableName: "order",
      Key: { id: req.params.id },
      UpdateExpression: "set payment_status=:p",
      ExpressionAttributeValues: {
        // id: { S: "req.body.id" },
        ":p": req.body.payment_status,
      },

      ReturnValues: "UPDATED_NEW",
    };
    docClient.update(params1, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json("order can not be Updated");
      } else {
        console.log("oreder has been Updated");
        return res.status(200).json(data);
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

let getOrdersByUserid = (req, res) => {
  try {
    const params = {
      TableName: "order",
      FilterExpression: "user_id=:ui",
      ExpressionAttributeValues: {
        ":ui": req.decoded.id,
      },
    };
    docClient.scan(params, (err, orders) => {
      if (err) {
        res.status(400).json("Order not found", err);
      } else {
        res.status(200).json(orders);
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createOrder,
  putOrder,
  getAllOrders,
  getOrdersByUserid,
};
