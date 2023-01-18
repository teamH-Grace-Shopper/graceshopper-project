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
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Diligence",
      price: 12.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1506452819137-0422416856b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
    },
    {
      name: "Hope",
      price: 8.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1610894065081-fce3e6833dcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
    },
    {
      name: "Courage",
      price: 15.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1592912807899-df995a7dd731?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Patience",
      price: 8.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1452109777848-a4de775da10d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80"
    },
    {
      name: "Humility",
      price: 13.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
    {
      name: "Temperance",
      price: 9.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50, 
      imageUrl: "https://images.unsplash.com/photo-1639390070513-7e786412ac9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
    },
    {
      name: "Charity",
      price: 18.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1452109777848-a4de775da10d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80"
    },
    {
      name: "Kindness",
      price: 4.00,
      description: loremHipsum(),
      type: "GOOD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    },
    {
      name: "Pride",
      price: 25.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1505274664176-44ccaa7969a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Lust",
      price: 15.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1631894190936-90c39f894f2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
    },
    {
      name: "Envy",
      price: 18.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1491319669671-30014eb16b8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=759&q=80"
    },
    {
      name: "Greed",
      price: 10.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1589666477647-20061470911d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
    },
    {
      name: "Wrath",
      price: 25.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1592623159714-59671c62aebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=416&q=80"
    },
    {
      name: "Sloth",
      price: 9.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1668437701504-4c6689c3ce06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=417&q=80"
    },
    {
      name: "Gluttony",
      price: 13.00,
      description: loremHipsum(),
      type: "BAD",
      stockAmount: 50,
      imageUrl: "https://images.unsplash.com/photo-1536703219213-0223580c76b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
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
