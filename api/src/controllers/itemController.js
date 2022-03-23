var AWS = require("aws-sdk");
const { NULL } = require("dynamoose");
var docClient = new AWS.DynamoDB.DocumentClient();
const Ulid = require("ulid");

let getAllItems = (req, res) => {
  try {
    const params = {
      TableName: "item",
      FilterExpression: "flag=:f",
      ExpressionAttributeValues: {
        ":f": "Active",
      },
    };
    docClient.scan(params, (err, items) => {
      if (err) {
        console.log(err);
        return res.json("Item not found", err).status(404);
      } else {
        var item = items.Items;
        const params1 = {
          TableName: "category",
        };
        docClient.scan(params1, (err, categories) => {
          if (err) {
            return res.json("category not found", err).status(404);
          } else {
            var category = categories.Items;
            var allItems = [];
            item.forEach((itemCID) => {
              category.forEach((categoryCID) => {
                if (itemCID.category_id == categoryCID.id) {
                  itemCID["category"] = categoryCID;
                  allItems.push(itemCID);
                }
              });
            });
            return res.json(allItems).status(200);
          }
        });
      }
    });
  } catch (err) {
    res.json(err).status(404);
  }
};

let getOneItem = (req, res) => {
  var foodId = req.params.foodid;
  try {
    const params = {
      Key: {
        id: foodId,
      },
      TableName: "item",
    };
    docClient.get(params, (err, itemData) => {
      if (Object.keys(itemData).length === 0) {
        res
          .json({ message: "id does not found " })
          .status(404);
        return;
      } else if (err) {
        res.json(err).status(404);
        return;
      } else {
        var item = itemData.Item;
        const params1 = {
          TableName: "category",
        };
        docClient.scan(params1, (err, categories) => {
          if (err) {
            return res.json("category not found").status(404);
          } else {
            var category = categories.Items;
            category.forEach((categoryCID) => {
              if (item.category_id == categoryCID.id) {
                item["category"] = categoryCID;
                return res.json(item).status(200);
              }
            });
          }
        });
      }
    });
  } catch (err) {
    return res.json(err).status(404);
  }
};

let postOneItem = (req, res) => {
  try {
    const params = {
      TableName: "item",
      Item: {
        id: { S: Ulid.ulid() },
        category_id: { S: req.body.category_id },
        image: { S: req.body.image },
        rating: { N: req.body.rating },
        price: { N: req.body.price },
        description: { S: req.body.description },
        name: { S: req.body.name },
        flag: { S: "Active" },
      },
    };
    new AWS.DynamoDB().putItem(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err).status(400);
      } else {
        console.log("Item has been added");
        return res.json(data).status(200);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

let putOneItem = (req, res) => {
  try {
    var params1 = {
      TableName: "item",
      Key: { id: req.params.foodid },
      UpdateExpression:
        "set image=:i,  rating=:r, price=:p, description=:d, category_id=:c,#itemName=:n",
      ExpressionAttributeValues: {
        // id: { S: "req.body.id" },
        ":c": req.body.category_id,
        ":i": req.body.image,
        ":r": req.body.rating,
        ":p": req.body.price,
        ":d": req.body.description,
        ":n": req.body.name,
        // ":f": req.body.flag,
      },
      ExpressionAttributeNames: {
        "#itemName": "name",
      },
      ReturnValues: "UPDATED_NEW",
    };
    docClient.update(params1, (err, data) => {
      if (err) {
        console.log(err);
        return res.json("Item can not be Updated").status(400);
      } else {
        console.log("Item has been Updated");
        return res.json(data).status(200);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteItemById = (req, res) => {
  var params1 = {
    TableName: "item",
    Key: { id: req.params.foodid },
  };
  docClient.delete(params1, (err, data) => {
    if (err) {
      console.log(err);
      return res.json("Item 1can not be deleted",err).status(400);
    } else {
      console.log("Item1 has been deleted");
      return res.json("Item 1has been deleted").status(200);
    }
  });
};

let deleteOneItem = (req, res) => {
  try {
    var params1 = {
      TableName: "item",
      Key: { id: req.params.foodid },
      UpdateExpression: "set flag=:f",
      ExpressionAttributeValues: {
        // id: { S: "req.body.id" },
        ":f": "InActive",
      },

      ReturnValues: "UPDATED_NEW",
    };
    docClient.update(params1, (err, data) => {
      if (err) {
        console.log(err);
        return res.json("Item can not be deleted", err).status(400);
      } else {
        console.log("Item has been deleted");
        return res.json(data).status(200);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllItems,
  getOneItem,
  postOneItem,
  putOneItem,
  deleteOneItem,
  deleteItemById,
};
