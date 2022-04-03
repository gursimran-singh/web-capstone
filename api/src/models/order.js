const dynamoose = require("dynamoose");
var AWS = require("aws-sdk");
const Ulid = require("ulid");
const DynamoDB = new AWS.DynamoDB();

var orderSchema = new dynamoose.Schema({
  id: {
    type: String,
    required: true,
  },
  total_price: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  dish_list: {
    type: String,
    required: true,
  },
  order_date: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    default: "False",
    required: true,
  },
  delivery_date: {
    type: String,
    required: true,
  },
});

const Order = dynamoose.model("order", orderSchema);

let date = new Date(Date.now());
let formatDate =
  date.getFullYear() + "/" + "0" + (date.getMonth() + 1) + "/" + date.getDate();

function createOrder(data) {
  const newOrder = new Order(data);
  newOrder.id = Ulid.ulid();
  newOrder.order_date = formatDate;
  return newOrder.save();
}

function getAllOrders() {
  return Order.scan().exec();
}

module.exports = { createOrder, getAllOrders };
