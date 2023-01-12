const router = require("express").Router();
const {
  models: { OrderItem },
} = require("../db");
module.exports = router;

// GET route All OrderItems
router.get("/", async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.status(200).send(orderItems);
  } catch (err) {
    next(err);
  }
});

// GET route single orderItem
router.get("/:id", async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    res.status(200).send(orderItem);
  } catch (err) {
    next(err);
  }
});

// UPDATE /api/orders/:id - update orderItem
router.put("/:id", async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    res.status(200).send(await orderItem.update(req.body));
  } catch (err) {
    next(err);
  }
});

// CREATE orderItem /api/orders
router.post("/", async (req, res, next) => {
  try {
    const orderItem = await OrderItem.create(req.body);
    res.status(201).send(orderItem);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.id);
    res.status(200).send(orderItem.destroy());
  } catch (err) {
    next(err);
  }
});
