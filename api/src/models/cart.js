const dynamoose = require("dynamoose");
var AWS = require("aws-sdk");
const DynamoDB = new AWS.DynamoDB();
const Ulid = require("ulid");

var cartSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = dynamoose.model("cart", cartSchema);

function addCart(id,status,user_id) {
  const params = {
    TableName: "cart",
    Item: {
      id: { S: id },
      status: { S: status },
      user_id: { S: user_id },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add cart", err);
    } else {
      console.log(`cart ***${id}*** has been added`);
    }
  });
}

function getAllCart() {
  const params = {
    TableName: "cart",
  };

  DynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to find cart", err);
    } else {
      console.log(`Found ${data.Count} cart`);
      console.log(data.Items);
    }
  });
}

function deleteCart(id) {
  const params = {
    TableName: "cart",
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
  getAllCart,
  deleteCart,
  addCart,
};
