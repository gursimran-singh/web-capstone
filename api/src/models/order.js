const dynamoose = require("dynamoose");
var AWS = require("aws-sdk");
const DynamoDB = new AWS.DynamoDB();

var orderSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = dynamoose.model("order", orderSchema);

function addOrder(id, total_price, transaction_id, user_id) {
  const params = {
    TableName: "order",
    Item: {
      id: { S: id },
      total_price: { N: total_price },
      transaction_id: { S: transaction_id },
      user_id: { S: user_id },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add order", err);
    } else {
      console.log(`order ***${id}*** has been added`);
    }
  });
}

function getAllOrder() {
  const params = {
    TableName: "order",
  };

  DynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to find order", err);
    } else {
      console.log(`Found ${data.Count} order`);
      console.log(data.Items);
    }
  });
}

function deleteOrder(id) {
  const params = {
    TableName: "order",
    Key: {
      id: { S: id },
    },
  };
  DynamoDB.deleteItem(params, function (err) {
    if (err) {
      console.error("Unable to delete", err);
    } else {
      console.log(`Deleted`);
    }
  });
}

module.exports = { getAllOrder, deleteOrder, addOrder };
