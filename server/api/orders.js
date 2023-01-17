const router = require("express").Router();
const {
  models: { Order, OrderItem, User, Product },
} = require("../db");
module.exports = router;


//GET route /api/orders - All Orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

//GET route /api/orders/:id - single order - including the orderItems
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [User, OrderItem],
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

//POST route /api/orders  //for adding orders once it's completed
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Order.create(req.body));
  } catch (error) {
    next(error);
  }
});

//PUT route  /api/orders  updating an order item
router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    res.status(200).send(await order.update(req.body));
  } catch (error) {
    next(error);
  }
});

//GET route /api/orders/users/:id // ORDERs of specific user
router.get("/users/:id", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.id },
      include: {
        model: OrderItem,
        include: {
          model: Product
        }
      }
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});
