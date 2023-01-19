const router = require('express').Router()
module.exports = router

// Routes for /api/...
router.use('/users', require('./users'))
router.use("/products", require('./products'))
router.use("/orders", require("./orders"))
router.use("/order-item", require("./orderItems"))

// Error Handling
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
