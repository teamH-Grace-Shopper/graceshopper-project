"use strict";

const {
  db,
  models: { User, Product, Order, OrderItem },
} = require("../server/db");
const { faker } = require("@faker-js/faker");
const hipsum = require("lorem-hipsum");

const loremHipsum = () =>
  hipsum({
    count: 3,
    units: "paragraphs",
    paragraphLowerBound: 3,
    paragraphsUpperBound: 10,
    format: "plain",
  });

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  const users = [
    {
      username: "grados123",
      password: "123",
      email: "george@gmail.com",
      firstName: "George",
      lastName: "Grados",
      address1: "456 Harvest Ave",
      city: "New York",
      state: "NY",
      zipCode: 55555,
      isAdmin: false,
    },
    {
      username: "joe",
      password: "123",
      email: "aguila@gmail.com",
      firstName: "Nick",
      lastName: "Aguila",
      address1: "123 Lupe Track",
      city: "Miami",
      state: "FL",
      zipCode: 55555,
      isAdmin: true,
    },
    {
      username: "robert",
      password: "123",
      email: "robert@gmail.com",
      firstName: "robert",
      lastName: "robert",
      address1: "123 Lupe Track",
      city: "Robert",
      state: "FL",
      zipCode: 55555,
      isAdmin: false,
    },
  ];

  const productList = [
    {
      name: "Integrity",
      price: 10.00,
      description: loremHipsum(),
      type: "Good",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/L4YGuSg0fxs"
    },
    {
      name: "Diligence",
      price: 12.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: 
    },
    {
      name: "Hope",
      price: 8.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/4qHWTuP_RLw"
    },
    {
      name: "Courage",
      price: 15.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/9FMDYPCv8mQ"
    },
    {
      name: "Patience",
      price: 8.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/dSIcpkddKrM"
    },
    {
      name: "Humility",
      price: 13.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/i5Kx0P8A0d4"
    },
    {
      name: "Temperance",
      price: 9.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50, 
      imageUrl: "https://unsplash.com/photos/-HBGtRO3dMM"
    },
    {
      name: "Charity",
      price: 18.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/SqjhKY9877M"
    },
    {
      name: "Kindness",
      price: 4.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/XX2WTbLr3r8"
    },
    {
      name: "Pride",
      price: 25.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/ouVAsbiwzlo"
    },
    {
      name: "Lust",
      price: 15.00,
      description: loremHipsum(),
      type: "Bade",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/eLsb0XBZLKs"
    },
    {
      name: "Envy",
      price: 18.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/j8a-TEakg78"
    },
    {
      name: "Greed",
      price: 10.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/3gRUlEJoVfY"
    },
    {
      name: "Wrath",
      price: 25.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/CLeKx9-Pg6g"
    },
    {
      name: "Sloth",
      price: 9.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/OoN9JCrF_Og"
    },
    {
      name: "Gluttony",
      price: 13.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://unsplash.com/photos/FFn2-TW8pxk"
    },
  ];
  const orders = [
    { completeStatus: null, userId: 1 },
    { completeStatus: faker.date.past(), userId: 3 },
    { completeStatus: faker.date.past(), userId: 1 },
    { completeStatus: null, userId: 3 },
    { completeStatus: faker.date.past(), userId: 3 },
    { completeStatus: faker.date.past(), userId: 1 },
    { completeStatus: faker.date.past(), userId: 3 },
  ];
  const orderItem = [
    {
      cartQuantity: 4,
      productId: 1,
      orderId: 1,
    },
    {
      cartQuantity: 2,
      productId: 3,
      orderId: 1,
    },
    {
      cartQuantity: 1,
      productId: 2,
      orderId: 2,
    },
    {
      cartQuantity: 1,
      productId: 4,
      orderId: 2,
    },
    {
      cartQuantity: 1,
      productId: 6,
      orderId: 2,
    },
    {
      cartQuantity: 3,
      productId: 5,
      orderId: 3,
    },
    {
      cartQuantity: 5,
      productId: 6,
      orderId: 4,
    },
    {
      cartQuantity: 2,
      productId: 8,
      orderId: 4,
    },
    {
      cartQuantity: 2,
      productId: 10,
      orderId: 5,
    },
    {
      cartQuantity: 3,
      productId: 9,
      orderId: 6,
    },
    {
      cartQuantity: 2,
      productId: 7,
      orderId: 7,
    },
    {
      cartQuantity: 2,
      productId: 8,
      orderId: 7,
    },
    {
      cartQuantity: 2,
      productId: 9,
      orderId: 7,
    },
  ];

  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  await Promise.all(users.map((user) => User.create(user)));

  // Create Products
  await Promise.all(productList.map((product) => Product.create(product)));

  await Promise.all(orders.map((order) => Order.create(order)));

  await Promise.all(orderItem.map((order) => OrderItem.create(order)));

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${productList.length} products`);
  console.log(`seeded ${orderItem.length} order items`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
