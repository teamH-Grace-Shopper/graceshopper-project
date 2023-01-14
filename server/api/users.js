const router = require("express").Router();
const {
  models: { User, Order, Product },
} = require("../db");
const OrderItem = require("../db/models/OrderItem");
module.exports = router;


// GET route /api/users
router.get("/", async (req, res, next) => {
  try {
    // only users with a token will be able to see the users
    const users = await User.findAll({
      attributes: [
        "id",
        "username",
        "email",
        "firstName",
        "lastName",
        "address1",
        "city",
        "state",
        "zipCode",
        "isAdmin",
      ],
    });
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
});

// GET route /api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    // only users with token can view page
    const user = await User.findByPk(req.params.id, {
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
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// POST route /api/users
router.post("/", async (req, res, next) => {
  try {
    const uniqueUserEmail = await User.findOne({
      where: { email: req.body.email },
    });
    const uniqueUsername = await User.findOne({
      where: { username: req.body.username },
    });

    if (uniqueUserEmail || uniqueUsername) {
      let err = new Error("must have unique email or username!");
      next(err);
    }
    res.status(201).send(await User.create(req.body));
  } catch (err) {
    next(err);
  }
});

// PUT route /api/users/:id
router.put("/:id", async (req, res, next) => {
  try {
    // if request body has token
    if (req.headers.authorization) {
      // user is the one with token
      const user = await User.findByToken(req.headers.authorization);
      // user can update their information
      res.status(200).send(await user.update(req.body));
    } else {
      // if user doesn't have a token and is a guest
      const user = await User.findByPk(req.params.id);
      if (!user) {
        let err = new Error("sorry cannot edit user at this time");
        next(err);
      }
      // if guest let them change other info
      res.status(200).send(await user.update({
        address1: req.body.user.address1,
        city:req.body.user.city,
        state:req.body.user.state,
        zipCode: req.body.user.zipCode
      }));
    }
  } catch (err) {
    next(err);
  }
});
