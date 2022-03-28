const dynamoose = require("dynamoose");
const Ulid = require("ulid");

var userSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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

const User = dynamoose.model("user", userSchema);

function createUser(data) {
  const newUser = new User(data);
  newUser.id = Ulid.ulid();
  return newUser.save();
}

function getAllUsers() {
  return User.scan().exec();
}

function getUser(email) {
  return User.scan().filter("email").eq(email).exec();
}

function updateUser(id, body) {
  return User.update({ id: id }, body);
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

module.exports = { getUser, createUser, deleteUser, updateUser, getAllUsers };
