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

//GET route /api/orders/1/order-items - All Orders
router.get("/:id/order-items", async (req, res, next) => {
  try {
    const orders = await Order.findByPk(req.params.id, {
      include: [User, OrderItem],
    });
    res.send(orders.orderItems);
  } catch (err) {
    next(err);
  }
});

//GET route /api/orders/1/order-items - All Orders
router.put("/:id/order-items", async (req, res, next) => {
  try {
    const orders = await Order.findByPk(req.params.id, {
      include: [OrderItem],
    });
    const updatedOrder = orders.orderItems
    res.status(200).send(updatedOrder.update(req.body));
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
    console.log("Request Headers", req.headers);
    const orders = await Order.findAll({
      where: {
        userId: req.params.id,
      },
      include: {
        model: OrderItem,
        include: {
          model: Product,
        },
      },
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

//POST route /api/orders/users/:id // ORDERs of specific user
router.put("/users/:id", async (req, res, next) => {
  try {
    const cart = await User.findByPk(req.params.id, {
      where: {
        completeStatus: null,
      },
      include: {
        model: Order,
        include: {
          model: OrderItem,
          include: {
            model: Product,
          },
        },
      },
    });
    res.status(200).send(cart.update(req.body));
  } catch (err) {
    next(err);
  }
});

//GET route /api/orders/users-cart/:id // ORDERs of specific user
router.get("/users-cart/:id", async (req, res, next) => {
  try {
    console.log("Request Headers", req.headers);
    const userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        completeStatus: null,
      },
      include: {
        model: OrderItem,
        include: {
          model: Product,
        },
      },
    });
    res.send(userCart);
  } catch (err) {
    next(err);
  }
});

//PUT route /api/orders/users-cart/:id // ORDERs of specific user
router.put("/users-cart/:id", async (req, res, next) => {
  try {
    console.log("Request Headers", req.headers);
    const userCart = await Order.findOne({
      where: {
        userId: req.params.id,
        completeStatus: null,
      },
      include: {
        model: OrderItem,
        include: {
          model: Product,
        },
      },
    });
    res.send(await userCart.update(req.body));
  } catch (err) {
    next(err);
  }
});
