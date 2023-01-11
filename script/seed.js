'use strict'

const {db, models: {User, Product, Order, OrderItem} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', email: "cody@gmail.com", firstName: "Cody", lastName: "Cody", address1: "123 Main St.", userType: "CUSTOMER" }),
    User.create({ username: 'murphy', password: '123', email: "murphy@gmail.com", firstName: "Murphy", lastName: "Murphy", address1: "323 Main St.", userType: "CUSTOMER" }),
    User.create({ username: 'ashley', password: '123', email: "ashley@gmail.com", firstName: "Ashley", lastName: "Ashley", address1: "456 Main St.", userType: "CUSTOMER" }),
    User.create({ username: 'jordan', password: '123', email: "jordan@gmail.com", firstName: "Jordan", lastName: "Jordan", address1: "789 Main St.", userType: "CUSTOMER" })
   ])
  
   const products = await Promise.all([
    Product.create({ name: 'hope', price: 10.00, quantity: 5, description: "hope"}),
    Product.create({ name: 'desire', price: 15.00, quantity: 10, description: "desire" }),
    Product.create({ name: 'bad soul', price: 3.00, quantity: 2, description: "bad soul 1" }),
    Product.create({ name: 'bad soul 2', price: 4.50, quantity: 3, description: "bad soul 2" })
   ])


   const orders = await Promise.all([
    Order.create({completed: '2023-01-01T00:00:00.000Z', userId: 1}),
    Order.create({completed: '2023-02-02T00:00:00.000Z', userId: 3}),
   ])

   const orderItems = await Promise.all([
    OrderItem.create({quantity: 3, orderId: 1, productId: products[0].id, price: products[0].price}),
    OrderItem.create({quantity: 2, orderId: 1, productId: products[1].id, price: products[1].price}),
    OrderItem.create({quantity: 1, orderId: 1, productId: products[2].id, price: products[2].price}),
    OrderItem.create({quantity: 1, orderId: 1, productId: products[3].id, price: products[3].price}),
    OrderItem.create({quantity: 2, orderId: 2, productId: products[2].id, price: products[2].price}),
    OrderItem.create({quantity: 2, orderId: 2, productId: products[3].id, price: products[3].price})
   ])

  
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products` )
  console.log(`seeded ${orderItems.length} order items`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1],
      ashley: users[2],
      jordan: users[3]
    }
  }
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
