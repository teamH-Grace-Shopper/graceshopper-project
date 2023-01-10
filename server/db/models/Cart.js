const Sequelize = require('sequelize');
const { INTEGER, DECIMAL } = Sequelize
const db = require('../db');

const Cart = db.define('cart', {
    quantity: {
        type: INTEGER
    },
    totalPrice: {
        type: DECIMAL
    }
})

module.exports = Cart