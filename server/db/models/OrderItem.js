const Sequelize = require('sequelize');
const { INTEGER, DECIMAL } = Sequelize
const db = require('../db');

const OrderItem = db.define('orderItem', {
    cartQuantity: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
        valid: {
            min: 0
        }
    },
    price: {
        type: DECIMAL,
        valid: {
            min: 0
        }
    }
})

module.exports = OrderItem