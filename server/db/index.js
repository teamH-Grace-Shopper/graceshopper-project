//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem')

// ASSOCIATIONS

// User and Order - one-to-many
User.hasMany(Order);
Order.belongsTo(User);

// OrderItem and Order - one-to-many
OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

// OrderItem and the Product
OrderItem.belongsTo(Product)

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem,
  },
}
