const Sequelize = require('sequelize');
const { INTEGER } = Sequelize
const db = require('../db');

const CartItem = db.define('order', {
    quantity: {
        type: INTEGER
    }
})

module.exports = CartItem