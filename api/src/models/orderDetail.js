const dynamoose = require("dynamoose");
var AWS = require("aws-sdk");
const DynamoDB = new AWS.DynamoDB();

var orderDetailSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  item_price: {
    type: Number,
    required: true,
  },
  delivery_date: {
    type: String,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  item_id: {
    type: String,
    required: true,
  },
});

module.exports = dynamoose.model("orderDetail", orderDetailSchema);

function addOrderDetail(id, quantity, item_price, order_id, item_id) {
  const params = {
    TableName: "orderDetail",
    Item: {
      id: { S: id },
      quantity: { N: quantity },
      item_price: { N: item_price },
      order_id: { S: order_id },
      item_id: { S: item_id },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add order detail", err);
    } else {
      console.log(`orderdetail ***${id}*** has been added`);
    }
  });
}

function getAllOrderDetail() {
  const params = {
    TableName: "orderDetail",
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

function deleteOrderDetail(id) {
  const params = {
    TableName: "orderDetail",
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

module.exports = { getAllOrderDetail, deleteOrderDetail, addOrderDetail };
