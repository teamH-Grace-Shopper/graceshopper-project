const { faker } = require('@faker-js/faker') 
const hipsum = require("lorem-hipsum");

const loremHipsum = () =>
  hipsum({
    count: 3,
    units: "paragraphs",
    paragraphLowerBound: 5,
    paragraphsUpperBound: 15,
    format: "plain",
  });



// Product DATA
// Bad Soul
const createBadSoul = () => {
    return {
        name: faker.word.verb({ length: { min: 4, max: 8}, strategy: "fail"}), 
        price: faker.commerce.price(5, 200, 2), 
        quantity: faker.datatype.number({ min: 10, max: 200}), 
        description: loremHipsum(),
        type: "BAD"
    }
}

// Good Soul
const createGoodSoul = () => {
    return {
        name: faker.word.verb({ length: { min: 4, max: 8}, strategy: "fail"}), 
        price: faker.commerce.price(5, 200, 2), 
        quantity: faker.datatype.number({ min: 10, max: 200}), 
        description: loremHipsum(),
        type: "GOOD"
    }
}

module.exports = {
    createBadSoul,
    createGoodSoul,
}