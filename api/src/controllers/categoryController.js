var AWS = require("aws-sdk");
// const { NULL } = require("dynamoose");
var docClient = new AWS.DynamoDB.DocumentClient();
const Ulid = require("ulid");

let getAllCategories = (req, res) => {
  try {
    const params = {
      TableName: "category",
      FilterExpression: "flag=:f",
      ExpressionAttributeValues: {
        ":f": "Active",
      },
    };
    docClient.scan(params, (err, categories) => {
      if (err) {
        return res.json(err).status(404);
      } else {
        return res.json(categories.Items).status(200);
      }
    });
  } catch (err) {
    res.json(err).status(404);
  }
};

let getOneCategory = (req, res) => {
  try {
    const params = {
      Key: {
        id: req.params.categoryid,
      },
      TableName: "category",
    };
    docClient.get(params, (err, category) => {
      if (Object.keys(category).length === 0) {
        res
          .json({ message: "Table does not have data with that ID " + err })
          .status(404);
        return;
      } else if (err) {
        res.json(err).status(404);
        return;
      } else {
        return res.json(category.Item).status(200);
      }
    });
  } catch (err) {
    return res.json(err).status(404);
  }
};

let updateOneCategory = (req, res) => {
  try {
    var params = {
      TableName: "category",
      Key: { id: req.params.categoryid },
      UpdateExpression: "set image=:i,#categoryName=:n",
      ExpressionAttributeValues: {
        ":i": req.body.image,
        ":n": req.body.name,
        // ":f": req.body.flag,
      },
      ExpressionAttributeNames: {
        "#categoryName": "name",
      },
      ReturnValues: "UPDATED_NEW",
    };
    docClient.update(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.json("category can not be Updated", err).status(400);
      } else {
        console.log("category has been Updated");
        return res.json(data).status(200);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

let createOneCategory = (req, res) => {
  try {
    const params = {
      TableName: "category",
      Item: {
        id: { S: Ulid.ulid() },
        image: { S: req.body.image },
        name: { S: req.body.name },
        flag: { S: "Active" },
      },
    };
    new AWS.DynamoDB().putItem(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err).status(400);
      } else {
        console.log("category has been added");
        return res.json(data).status(200);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

let deleteCategory = (req, res) => {
  try {
    var params = {
      TableName: "category",
      Key: { id: req.params.categoryid },
      UpdateExpression: "set flag=:f",
      ExpressionAttributeValues: {
        ":f": "InActive",
      },
      ReturnValues: "UPDATED_NEW",
    };
    var paramItem = {
      TableName: "item",
      FilterExpression: "flag=:f",
      ExpressionAttributeValues: {
        ":f": "Active",
      },
    };
    docClient.scan(paramItem, (err, items) => {
      if (err) {
        console.log(err);
        return res.json("Item not found", err).status(404);
      } else {
        // console.log(items.Items);
        var itemList = items.Items;
        let cId = [];
        itemList.forEach((cid) => {
          cId.push(cid.category_id);
        });
        if (cId.indexOf(req.params.categoryid) !== -1) {
          return res
            .json(
              "Category can not be deleted , It has reference to other table"
            )
            .status(200);
        } else {
          docClient.update(params, (err, data) => {
            if (err) {
              console.log(err);
              return res.json("category can not be deleted", err).status(400);
            } else {
              return res.json(data).status(200);
            }
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};



module.exports = {
  getAllCategories,
  getOneCategory,
  createOneCategory,
  updateOneCategory,
  deleteCategory,
};
