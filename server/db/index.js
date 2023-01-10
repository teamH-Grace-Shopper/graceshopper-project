//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Cart = require('./models/Cart')

// ASSOCIATIONS

// User and Product - one-to-many - need to figure this out
User.hasMany(Product); 
Product.belongsTo(User);

// User and Order - one-to-many
User.hasMany(Order);
Order.belongsTo(User);

// User and Cart - one-to-one
User.hasOne(Cart);
Cart.belongsTo(User);

/* 
 * Junction Tables Created by Sequelize Associations 
 */

// Cart and Product - many-to-many
Cart.belongsToMany(Product, { through: "CartItem" });
Product.belongsToMany(Cart, { through: "CartItem" });

// Order and Product - many-to-many
Order.belongsToMany(Product, { through: "OrderItem"});
Product.belongsToMany(Order, { through: "OrderItem"})

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Cart
  },
}
