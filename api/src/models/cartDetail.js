const dynamoose = require("dynamoose");
var AWS = require("aws-sdk");
const DynamoDB = new AWS.DynamoDB();
const Ulid = require("ulid");

var cartDetailSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  cart_id: {
    type: String,
  },
  item_id: {
    type: String,
  },
});

module.exports = dynamoose.model("cartDetail", cartDetailSchema);

function addCartDetail(id,quantity,cart_id,item_id) {
  const params = {
    TableName: "cartDetail",
    Item: {
      id: { S: id },
      quantity: { N: quantity },
      cart_id: { S: cart_id },
      item_id: { S: item_id },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add cartDetail", err);
    } else {
      console.log(`cartdetail ***${id}*** has been added`);
    }
  });
}

function getAllCartDetail() {
  const params = {
    TableName: "cartDetail",
  };

  DynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to find cartDetail", err);
    } else {
      console.log(`Found ${data.Count} cartdetail`);
      console.log(data.Items);
    }
  });
}

function deleteCartDetail(id) {
  const params = {
    TableName: "cartDetail",
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



module.exports = {
  getAllCartDetail,
  deleteCartDetail,
  addCartDetail,
};
