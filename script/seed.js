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

  await Promise.all([
    User.create({
      username: 'joe',
      password: '123',
      email: 'aguila@gmail.com',
      firstName: 'Nick',
      lastName: 'Aguila',
      address1: '123 Lupe Track',
      city: 'Miami',
      state: 'FL',
      zipCode: 55555,
      isAdmin: true
    })
  ])

  await Promise.all([
    User.create({
      username: 'robert',
      password: '123',
      email: 'robert@gmail.com',
      firstName: 'robert',
      lastName: 'robert',
      address1: '123 Lupe Track',
      city: 'Robert',
      state: 'FL',
      zipCode: 55555,
      isAdmin: false,
      // orders: [
      //   {
      //   id: 21,
      //   orderNumber: "65f60d20-4b3a-4691-81ab-sdfadsfasdfdsfasdf",
      //   completeStatus: null,
      //   userId: 37,
      //   orderItems: [
      //   {
      //   id: 2,
      //   quantity: 1,
      //   price: "17.00",
      //   orderId: 1,
      //   productId: 58,
      //   product: {
      //   id: 58,
      //   name: "favour",
      //   price: 112.00,
      //   quantity: 163,
      //   description: "Bushwick tofu readymade ethical PBR polaroid. Flannel quinoa Wes Anderson keytar XOXO ethnic. Bicycle rights tote bag cray trust fund pug cray mumblecore Portland distillery 8-bit four loko Godard readymade flexitarian selfies. Gentrify roof party DIY American Apparel blog narwhal mlkshk flexitarian synth sriracha next level readymade gastropub. Pork belly raw denim Tonx tattooed kale chips keytar pug Williamsburg XOXO VHS Vice. Yr distillery cornhole flannel paleo pop-up semiotics lo-fi before they sold out disrupt Austin tattooed you probably haven't heard of them cray Pinterest.\r\nHigh Life Brooklyn lo-fi vegan ennui narwhal. Beard bicycle rights twee ethical bespoke 90's plaid food truck Vice authentic Kickstarter kitsch Portland. Vice organic flexitarian food truck gluten-free DIY umami disrupt viral. Cray gastropub beard jean shorts squid. Semiotics master cleanse jean shorts butcher flexitarian Williamsburg disrupt occupy wayfarers dreamcatcher. Roof party meh sriracha sustainable literally blog butcher tattooed post-ironic Pinterest chillwave Brooklyn.\r\nSustainable Banksy VHS umami fingerstache gentrify kogi. Crucifix normcore artisan leggings kale chips skateboard occupy Tumblr flexitarian hella semiotics aesthetic. Synth Vice Cosby sweater kogi messenger bag kitsch you probably haven't heard of them art party Tumblr pop-up pork belly. Letterpress scenester sustainable Blue Bottle semiotics literally gastropub kale chips lo-fi slow-carb. Direct trade  trust fund banjo occupy single-origin coffee Blue Bottle. Narwhal vegan street art selfies Bushwick ugh retro tousled.\r\n",
      //   type: "GOOD",
      //   imageUrl: "https://images.unsplash.com/photo-1531318701087-32c11653dd77?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      //   }
    //     }
    //   ]
    // },
  // ]},
    })
  ]);

  await Promise.all([
   Order.create({
        completeStatus: null,
        userId: 37,
   })
   ])






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

