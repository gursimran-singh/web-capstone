var AWS = require("aws-sdk");
const { NULL } = require("dynamoose");
var docClient = new AWS.DynamoDB.DocumentClient();

const getAllItems = (req, res) => {
  try {
    const params = {
      TableName: "item",
    };
    docClient.scan(params, (err, items) => {
      if (err) {
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

const postOneItem = async (req, res) => {
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
                },
              };
              new AWS.DynamoDB().putItem(params, (err) => {
                if (err) {
                  console.log(err);
                  return res.json("Item can not be added").status(400);
                } else {
                  console.log("Item has been added");
                  return res.json("Item has been added").status(200);
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

module.exports = { getAllItems, getOneItem, postOneItem };
