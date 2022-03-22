var AWS = require("aws-sdk");
const { NULL } = require("dynamoose");
var docClient = new AWS.DynamoDB.DocumentClient();

const getAllItems = (req, res) => {
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
        return res.json("Item not found").status(404);
      } else {
        var item = items.Items;
        const params1 = {
          TableName: "category",
        };
        docClient.scan(params1, (err, categories) => {
          if (err) {
            return res.json("category not found").status(404);
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

const getOneItem = (req, res) => {
  console.log(itemObject);
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
          .json({ message: "Table does not have data with that ID" })
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

const postOneItem =  (req, res) => {
  try {
    const paramsCategory = {
      TableName: "category",
    };
    docClient.scan(paramsCategory, (err, categories) => {
      if (err) {
        return res.json("Category not found").status(404);
      } else {
        var categoryItems = categories.Items;
        var name = [];
        categoryItems.forEach((citem) => {
          name.push(citem.name);
          // form field name to enter category=category_name
          var inputCname = req.body.category_name;

          if (name.indexOf(inputCname) !== -1) {
            if (citem.name == inputCname) {
              const params = {
                TableName: "item",
                Item: {
                  id: { S: req.body.id },
                  category_id: { S: citem.id },
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
                  return res.json("Item can not be added").status(400);
                } else {
                  console.log("Item has been added");
                  return res.json(data).status(200);
                }
              });
            }
          } else {
            console.log(
              "Category does not have any field that you have entered"
            );
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const putOneItem = (req, res) => {
  try {
    const paramsCategory = {
      TableName: "category",
    };
    docClient.scan(paramsCategory, (err, categories) => {
      if (err) {
        return res.json("Category not found").status(404);
      } else {
        var categoryItems = categories.Items;
        var name = [];
        categoryItems.forEach((citem) => {
          name.push(citem.name);
          // form field name to enter category=category_name
          var inputCname = req.body.category_name;
          if (name.indexOf(inputCname) !== -1) {
            if (citem.name == inputCname) {
              var params1 = {
                TableName: "item",
                Key: { id: req.params.foodid },
                UpdateExpression:
                  "set image=:i,  rating=:r, price=:p, description=:d, category_id=:c,#itemName=:n",
                ExpressionAttributeValues: {
                  // id: { S: "req.body.id" },
                  ":c": citem.id,
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
            }
          } else {
            console.log(
              "Category does not have any field that you have entered"
            );
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

// const deleteOneItem1 = (req, res) => {
// var params1 = {
//   TableName: "item",
//   Key: { id: req.params.foodid },
//   // UpdateExpression: "set flag=:f",
//   // ExpressionAttributeValues: {
//   //   // id: { S: "req.body.id" },
//   //   ":f": "True",
//   // },

//   // ReturnValues: "UPDATED_NEW",
// };
// docClient.delete(params1, (err, data) => {
//   if (err) {
//     console.log(err);
//     return res.json("Item 1can not be deleted").status(400);
//   } else {
//     console.log("Item1 has been deleted");
//     return res.json("Item 1has been deleted").status(200);
//   }
// });
// };

const deleteOneItem = (req, res) => {
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
      return res.json("Item can not be deleted").status(400);
    } else {
      console.log("Item has been deleted");
      return res.json(data).status(200);
    }
  });
};

module.exports = {
  getAllItems,
  getOneItem,
  postOneItem,
  putOneItem,
  deleteOneItem,
  // deleteOneItem1,
};
