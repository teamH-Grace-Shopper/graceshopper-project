const router = require('express').Router()
const { models: { User, Order, Product }} = require('../db');
const OrderItem = require('../db/models/OrderItem');
module.exports = router

// GET route /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'firstName', 'lastName', 'address1', 'city', 'state', 'zipCode', 'userType']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
});

// GET route /api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Order,
        include: {
          model: OrderItem,
          include: {
            model: Product
          }
        }
      }
    })
    res.send(user)
  } catch (err) {
    next(err)
  }
});

// POST route /api/users
router.post('/', async(req, res, next) => {
  try {
    const uniqueEmail = await User.findOne({ where: { email: req.body.email }});
    const uniqueUsername = await User.findOne({ where: {username: req.body.username}});

    if (uniqueEmail || uniqueUsername){
      let err = new Error("must have unique email or username!")
      next(err)
    }
    res.status(201).send(await User.create(req.body))
  }
  catch (err){
    next(err)
  }
});

// PUT route /api/users/:id
router.put('/:id', async(req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user){
      let err = new Error('sorry cannot edit user at this time')
      next(err)
    }
    res.status(200).send(await user.update(req.body))
  }
  catch(err){
    next(err)
  }
})