const router = require('express').Router()
const { models: { Order, OrderItem, User }} = require('../db')
module.exports = router

//GET route All Orders
router.get('/', async (req, res, next) => {
    try {
      const orders = await Order.findAll()
      res.send(orders)
    } catch (err) {
      next(err)
    }
  });

  //GET route single order - including the orderItems
  router.get('/:id', async (req, res, next) => {
    try {
      const order = await Order.findByPk(req.params.id, {
        include: [User, OrderItem]
      })
      res.send(order)
    } catch (err) {
      next(err)
    }
  });