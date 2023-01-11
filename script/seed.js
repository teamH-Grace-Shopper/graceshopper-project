'use strict'

const {db, models: {User, Product, Order, OrderItem} } = require('../server/db');
const { createRandomCustomer, createRandomAdmin} = require('./userData')
const { createBadSoul, createGoodSoul } = require('./productData')
const { createRandomOrder, createRandomOrderItem } = require('./orderData')

const createUserDataBase = (num) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    let customer = createRandomCustomer();
    arr.push(customer);
  }
  return arr;
}

const createAdminDataBase = (num) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    let admin = createRandomAdmin();
    arr.push(admin);
  }
  return arr;
}

const createProductDatabase = (num) => {
  const arr = [];
  let rand = Math.random();
  for (let i = 0; i < num; i++) {
    if (rand >= .35){
      let goodSoul = createGoodSoul();
      arr.push(goodSoul);
    } else {
      let badSoul = createBadSoul();
      arr.push(badSoul)
    }
  }
  return arr;
}

const createOrderDataBase = (num) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    let order = createRandomOrder();
    arr.push(order);
  }
  return arr;
}

const createRandomOrderItemDataBase = (num) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    let orderItem = createRandomOrderItem();
    arr.push(orderItem);
  }
  return arr;
}


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {

  const users = createUserDataBase(30);
  const admin = createAdminDataBase(5);
  const productList = createProductDatabase(60);
  const orders = createOrderDataBase(20);
  const orderItem = createRandomOrderItemDataBase(30);

  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  await Promise.all(users.map(user=>User.create(user)));
  await Promise.all(admin.map(ad=>User.create(ad)))

  // Create Products
  await Promise.all(productList.map(product=>Product.create(product)))

  await Promise.all(orders.map(order=>Order.create(order)))

  await Promise.all(orderItem.map(order=>OrderItem.create(order)))


  
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${productList.length} products` )
  console.log(`seeded ${orderItem.length} order items`)
  console.log(`seeded successfully`)
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //     ashley: users[2],
  //     jordan: users[3],
  //     nick: users[4]
  //   }
  // }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

