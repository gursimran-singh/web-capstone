const dynamoose = require("dynamoose");
var AWS = require("aws-sdk");
const DynamoDB = new AWS.DynamoDB();
const Ulid = require("ulid");

var categorySchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = dynamoose.model("category", categorySchema);

function addCategory(id, name, image) {
  const params = {
    TableName: "category",
    Item: {
      id: { S: id },
      name: { S: name },
      image: { S: image },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add category", err);
    } else {
      console.log(`Category ***${name}*** has been added`);
    }
  });
}

function getAllCategory() {
  const params = {
    TableName: "category",
  };

  DynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to find category", err);
    } else {
      console.log(`Found ${data.Count} category`);
      console.log(data.Items);
    }
  });
}

function deleteCategory(id) {
  const params = {
    TableName: "category",
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

//delete table
function deleteItem1Table() {
  var params = {
    TableName: "item",
  };

  DynamoDB.deleteTable(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to delete table. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "Deleted table. Table description JSON:",
        JSON.stringify(data, null, 2)
      );
    }
  });
}

module.exports = {
  getAllCategory,
  deleteCategory,
  addCategory,
  // deleteItem1Table,
};
