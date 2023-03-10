const router = require("express").Router();
const {
  models: { OrderItem, Product, Order },
} = require("../db");
module.exports = router;

// GET route /api/order-item
router.get("/", async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.status(200).send(orderItems);
  } catch (err) {
    next(err);
  }
});

// GET route /api/order-item/orders/:id
router.get("/orders/:id", async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      where: {
        orderId: req.params.id},
        include: [Product]
      });
    res.status(200).send(orderItems);
  } catch (err) {
    next(err);
  }
});

// POST route /api/order-item/orders/:id
router.post("/orders/:id", async (req, res, next) => {
  try {
    // create an order item to be posted into the Order with orderId = id
    const orderItem = await OrderItem.findAll({
      where: {
        orderId: req.params.id},
        include: [Product]
      });
    res.status(200).send(await orderItem.create(req.body));
  } catch (err) {
    next(err);
  }
});

// UPDATE /api/order-item/orders/:id
router.put("/orders/:id", async (req, res, next) => {
  try {
    const cartOrder = await OrderItem.findAll({
      where: {
        orderId: req.params.id},
        include: [Product]
      });
    res.status(200).send(cartOrder.update(req.body));
  } catch (err) {
    next(err);
  }
});

// CREATE /api/order-item/orders
router.post("/", async (req, res, next) => {
  try {
    const orderItem = await OrderItem.create(req.body);
    res.status(201).send(orderItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/order-item/orders
router.delete("/:id", async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    res.status(200).send(orderItem.destroy());
  } catch (err) {
    next(err);
  }
});
