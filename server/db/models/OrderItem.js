const Sequelize = require('sequelize');
const { INTEGER, DECIMAL } = Sequelize
const db = require('../db');

const OrderItem = db.define('orderItem', {
    quantity: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
        valid: {
            min: 0
        }
    },
    price: {
        type: DECIMAL,
        allowNull: false,
        valid: {
            min: 0
        }
    }
})

module.exports = OrderItem