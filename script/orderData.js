const { faker } = require("@faker-js/faker");
const hipsum = require("lorem-hipsum");
const { createBadSoul, createGoodSoul } = require("./productData");

//    const orderItems = await Promise.all([
//     OrderItem.create({quantity: 3, orderId: 1, productId: products[0].id, price: products[0].price}),
//     OrderItem.create({quantity: 2, orderId: 1, productId: products[1].id, price: products[1].price}),
//     OrderItem.create({quantity: 1, orderId: 1, productId: products[2].id, price: products[2].price}),
//     OrderItem.create({quantity: 1, orderId: 1, productId: products[3].id, price: products[3].price}),
//     OrderItem.create({quantity: 2, orderId: 2, productId: products[2].id, price: products[2].price}),
//     OrderItem.create({quantity: 2, orderId: 2, productId: products[3].id, price: products[3].price})
//    ])

// Fn to generate random Order
const createRandomOrder = () => {
  return {
    completeStatus: faker.date.past(),
    userId: Math.floor(Math.random() * 30 + 1), // generate X random orders from 20 users
  };
};

// create random orderItem
const createRandomOrderItem = () => {
  let order = createRandomOrder();
  let goodSoul = createGoodSoul();
  let badSoul = createBadSoul();
  let num = Math.random();
  if (num >= 0.35) {
    return {
      quantity: Math.floor(Math.random() * 4 + 1),
      price: goodSoul.price,
      productId: Math.floor(Math.random()*60)+1,
      orderId: Math.floor(Math.random()*20)+1,
    };
  } else {
    return {
      quantity: Math.floor(Math.random() * 4 + 1),
      price: badSoul.price,
      productId: Math.floor(Math.random()*60)+1,
      orderId: Math.floor(Math.random()*20)+1,
    };
  }
};

module.exports = {
  createRandomOrder,
  createRandomOrderItem,
};
