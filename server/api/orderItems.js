const router = require('express').Router()
const { models: { OrderItem }} = require('../db')
module.exports = router

//GET route All OrderItems
router.get('/', async (req, res, next) => {
    try {
      const orderItems = await OrderItem.findAll()
      res.send(orderItems)
    } catch (err) {
      next(err)
    }
  });

  //GET route single orderItem 
  router.get('/:id', async (req, res, next) => {
    try {
      const orderItem = await OrderItem.findByPk(req.params.id)
      res.send(orderItem)
    } catch (err) {
      next(err)
    }
  });