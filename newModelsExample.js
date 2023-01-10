/* 
    Order model
    OrderItem model
    Product model
    User model

    associations:

    Order.belongsTo(User)
    User.hasMany(Order)

    OrderItem.belongsTo(Order)
    Order.hasMany(OrderItem)

    OrderItem.belongsTo(Product)

    orderItem model
    {
        quantity: integer
        price: decimal
    }
*/