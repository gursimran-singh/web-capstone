var AWS = require("aws-sdk");
const item = require("../models/item");
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
        return res.status(400).json("Item not found", err);
      } else {
        var item = items.Items;
        const params1 = {
          TableName: "category",
        };
        docClient.scan(params1, (err, categories) => {
          if (err) {
            return res.status(400).json("category not found", err);
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
            return res.status(200).json(allItems);
          }
        });
      }
    });
  } catch (err) {
    res.status(400).json(err);
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
        res.status(400).json({ message: "id does not found " });
        return;
      } else if (err) {
        res.status(400).json(err);
        return;
      } else {
        var item = itemData.Item;
        const params1 = {
          TableName: "category",
        };
        docClient.scan(params1, (err, categories) => {
          if (err) {
            return res.status(400).json("category not found");
          } else {
            var category = categories.Items;
            category.forEach((categoryCID) => {
              if (item.category_id == categoryCID.id) {
                item["category"] = categoryCID;
                return res.status(200).json(item);
              }
            });
          }
        });
      }
    });
  } catch (err) {
    return res.status(400).json(err);
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
        return res.status(400).json(err);
      } else {
        console.log("Item has been added");
        return res.status(200).json(data);
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
        return res.status(400).json("Item can not be Updated");
      } else {
        console.log("Item has been Updated");
        return res.status(200).json(data);
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
      return res.status(400).json("Item 1can not be deleted", err);
    } else {
      console.log("Item1 has been deleted");
      return res.status(200).json("Item 1has been deleted");
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
        return res.status(400).json("Item can not be deleted", err);
      } else {
        console.log("Item has been deleted");
        return res.status(200).json(data);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const searchItems = (req, res) => {
  let params = {
    TableName : "item",
  }

  let que = req.query;
  let expression = 'flag=:f'; 
  let value = {
    ":f": "Active"
  };
  
  if(que.s && que.s != ''){
    expression += ' AND contains(#itemName, :s)';
    value[':s'] = que.s;
    params['ExpressionAttributeNames'] = {
      "#itemName": "name",
    }
  }

  if(que.cat){
    cat = que.cat.split(',');
    expression += ' AND category_id IN (';
    cat.forEach((v, i) => {
      expression += ':cat' + i + ',';
      value[':cat' + i] = v;
    });
    expression = expression.slice(0, -1);
    expression += ')';
  }

  params['FilterExpression'] = expression;
  params['ExpressionAttributeValues'] = value;
  
  docClient.scan(params, function(err, data) {
    if (err) {
      res.status(400).json({error: err});
    } else {
      res.status(200).json(data);
    }
  });
}

module.exports = {
  getAllItems,
  getOneItem,
  postOneItem,
  putOneItem,
  deleteOneItem,
  deleteItemById,
  searchItems
};
