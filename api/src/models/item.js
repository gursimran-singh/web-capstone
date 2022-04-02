const dynamoose = require("dynamoose");
// const { Schema } = require("dynamoose/dist/Schema");
// const categorySchema=require('./category');
// console.log(categorySchema.schemas);
var AWS = require("aws-sdk");
const DynamoDB = new AWS.DynamoDB();
// const Ulid = require("ulid");

var itemSchema = new dynamoose.Schema({
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
  price: {
    type: Number,
    required: true,
  },
  description: String,
  rating: {
    type: Number,
    // validate: (val) => val > 0 && val <= 5,
  },
  category_id: {
    type: String,
  },
  flag: {
    type: Boolean,
  },
});

const Item = dynamoose.model("item", itemSchema, {
  create: false,
  waitForActive: false
});

function addItems(
  id,
  name,
  image,
  rating,
  price,
  description,
  category_id,
  flag
) {
  const params = {
    TableName: "item",
    Item: {
      id: { S: id },
      name: { S: name },
      image: { S: image },
      price: { N: price },
      description: { S: description },
      rating: { N: rating },
      category_id: { S: category_id },
      flag: { S: flag },
    },
  };

  DynamoDB.putItem(params, function (err) {
    if (err) {
      console.error("Unable to add Item", err);
    } else {
      console.log(`Item ***${name}*** has been added`);
    }
  });
}

function getAllItems() {
  const params = {
    TableName: "item",
  };

  DynamoDB.scan(params, function (err, data) {
    if (err) {
      console.error("Unable to find items", err);
    } else {
      console.log(`Found ${data.Count} items`);
      console.log(data.Items);
    }
  });
}

function deleteItem(id) {
  const params = {
    TableName: "item",
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

module.exports = { getAllItems, deleteItem, addItems };
