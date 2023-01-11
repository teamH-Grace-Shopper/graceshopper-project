const router = require('express').Router()
const { models: { Product }} = require('../db')

//GET route all product
router.get('/', async (req, res, next) => {
    try {
      const products = await Product.findAll()
      res.send(products)
      
    } catch (err) {
      next(err)
    }
  })


//GET route single product
  router.get('/:id', async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id)
      res.send(product)
    } catch (err) {
      next(err)
    }
  })








  





module.exports = router