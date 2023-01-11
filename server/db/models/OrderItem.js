const Sequelize = require('sequelize');
const { INTEGER, DECIMAL } = Sequelize
const db = require('../db');

const OrderItem = db.define('orderItem', {
    quantity: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: DECIMAL,
        allowNull: false
    }
})

module.exports = OrderItem