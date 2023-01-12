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


  //POST route /api/products
  //Need to figure out admin validation; based on toke and userType
  router.post("/", async (req, res, next) => {
    try {
      res.status(201).send(await Product.create(req.body));
    } catch (error) {
      next(error);
    }
  });


  //PUT route /api/products
  router.put("/:id", async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.status(200).send(await product.update(req.body));
    } catch (error) {
      next(error);
    }
  });


  //DELETE route /api/products
  router.delete("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await Product.findByPk(id);
      if(!product){
        let err = new Error('cannot remove product, product does not exist')
        next(err);
      }
      await product.destroy();
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  });







  





module.exports = router