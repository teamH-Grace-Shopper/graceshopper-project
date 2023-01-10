//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// ASSOCIATIONS

// User and Product - one-to-many
User.hasMany(Product);
Product.belongsTo(User);

// User and Order - one-to-many
User.hasMany(Order);
Order.belongsTo(User)

module.exports = {
  db,
  models: {
    User,
    Product,
    Order
  },
}
