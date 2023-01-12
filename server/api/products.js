const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");

// GET route /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

// GET route /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

// Need to figure out admin validation; based on token and userType
// POST route /api/products
router.post("/", async (req, res, next) => {
  try {
    // find user by token
    const user = await User.findByToken(req.body.token);
    // if this user has a userType of ADMIN then able to create a product
    if (user && user.userType === "ADMIN")
      res.status(201).send(await Product.create(req.body));
    else {
      let err = new Error("Not authorized!");
      next(err);
    }
  } catch (error) {
    next(error);
  }
});

// PUT route /api/products
router.put("/:id", async (req, res, next) => {
  try {
    // get user by token and product
    const user = await User.findByToken(req.body.token);
    const product = await Product.findByPk(req.params.id);

    if (user && user.userType === "ADMIN") {
      res.status(200).send(await product.update(req.body));
    } else {
      const err = new Error("Not authorized!");
      next(err);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE route /api/products
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    const user = await User.findByToken(req.headers.authorization);

    if (user && user.userType === "ADMIN") {
      if (!product) {
        let err = new Error("cannot remove product, product does not exist");
        next(err);
      }
      await product.destroy();
      res.status(200).send(product);
    } else {
      const err = new Error("Not authorized!");
      next(err);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
