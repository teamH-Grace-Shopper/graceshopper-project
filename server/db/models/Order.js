const Sequelize = require('sequelize');
const { DATE, UUID, UUIDV4 } = Sequelize
const db = require('../db');

const Order = db.define('order', {
    orderNumber: {
        type: UUID,
        defaultValue: UUIDV4
    },
    completed: {
        type: DATE
    }
})

module.exports = Order