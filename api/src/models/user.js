const dynamoose = require("dynamoose");
var AWS = require("aws-sdk");
const DynamoDB = new AWS.DynamoDB();

var userSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: String,
  status: {
    type: String,
    default: "active",
  },
  type: {
    type: String,
    default: "User",
  },
});

module.exports = dynamoose.model("user", userSchema);

function addUser(id, name, email, password, address, status, type) {
  const params = {
    TableName: "user",
    Item: {
      id: { S: id },
      name: { S: name },
      email: { S: email },
      password: { S: password },
      address: { S: address },
      status: { S: status },
      type: { S: type },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add Item", err);
    } else {
      console.log(`User ***${name}*** has been added`);
    }
  });
}

function getAllUsers() {
  const params = {
    TableName: "user",
  };

  DynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to find User", err);
    } else {
      console.log(`Found ${data.Count} users`);
      console.log(data.Items);
    }
  });
}

function deleteUser(id) {
  const params = {
    TableName: "user",
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

module.exports = { addUser, deleteUser, getAllUsers };
