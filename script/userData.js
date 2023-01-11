const { faker } = require('@faker-js/faker') 

// create customers
const createRandomCustomer = () => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let state = faker.address.stateAbbr();

    return {
        username: faker.internet.userName(firstName, lastName),
        password: faker.random.alphaNumeric(12),
        email: faker.internet.email(firstName, lastName),
        firstName: firstName,
        lastName: lastName,
        address1: faker.address.streetAddress(),
        city: faker.address.cityName(),
        state: state,
        zipCode: Math.floor(Math.random()*90000)+10000,
        userType: "CUSTOMER"
    }
}

// create admin
const createRandomAdmin = () => {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let state = faker.address.stateAbbr();

    return {
        username: faker.internet.userName(firstName, lastName),
        password: faker.random.alphaNumeric(12),
        email: faker.internet.email(firstName, lastName),
        firstName: firstName,
        lastName: lastName,
        address1: faker.address.streetAddress(),
        city: faker.address.cityName(),
        state: state,
        zipCode: Math.floor(Math.random()*90000)+10000,
        userType: "ADMIN"
    }
}

module.exports ={
    createRandomCustomer,
    createRandomAdmin
}
