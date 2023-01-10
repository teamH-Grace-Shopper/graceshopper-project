const Sequelize = require('sequelize');
const { INTEGER } = Sequelize
const db = require('../db');

const OrderItem = db.define('order', {
    quantity: {
        type: INTEGER
    }
})

module.exports = OrderItem