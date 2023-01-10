const Sequelize = require('sequelize');
const { STRING, DECIMAL, INTEGER, TEXT } = Sequelize
const db = require('../db');

const Product = db.define('product', {
    name: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: DECIMAL,
        allowNull: false
    },
    quantity: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    description: {
        type: TEXT
    },
    imageUrl: {
        type: STRING,
        defaultValue: "https://images.unsplash.com/photo-1531318701087-32c11653dd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
})

module.exports = Product