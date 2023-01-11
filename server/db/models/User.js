const Sequelize = require('sequelize');
const { STRING, ENUM, INTEGER } = Sequelize
const db = require('../db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "AS",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "GU",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "CM",
  "OH",
  "OK",
  "OR",
  "PA",
  "PR",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "TT",
  "UT",
  "VT",
  "VA",
  "VI",
  "WA",
  "WV",
  "WI",
  "WY",
];

const User = db.define('user', {
  username: {
    type: STRING,
    // unique: true,
    allowNull: false
  },
  password: {
    type: STRING,
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  firstName: {
    type: STRING,
    allowNull: false
  },
  lastName: {
    type: STRING,
    allowNull: false
  },
  address1: {
    type: STRING,
    allowNull: false
  },
  address2: {
    type: STRING
  },
  city: {
    type: STRING,
  },
  state: {
    type: ENUM(states)
  },
  zipCode: {
    type: INTEGER,
    len: [5]
  },
  userType: {
    type: ENUM(["ADMIN", "CUSTOMER"])
  }
})


module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
}

User.prototype.generateToken = function() {
  return jwt.sign({id: this.id}, process.env.JWT)
}

/**
 * classMethods
 */
User.authenticate = async function({ username, password }){
    const user = await this.findOne({where: { username }})
    if (!user || !(await user.correctPassword(password))) {
      const error = Error('Incorrect username/password');
      error.status = 401;
      throw error;
    }
    return user.generateToken();
};

User.findByToken = async function(token) {
  try {
    const {id} = await jwt.verify(token, process.env.JWT)
    const user = User.findByPk(id)
    if (!user) {
      throw 'nooo'
    }
    return user
  } catch (ex) {
    const error = Error('bad token')
    error.status = 401
    throw error
  }
}

/**
 * hooks
 */
const hashPassword = async(user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
}

User.beforeCreate(hashPassword)
User.beforeUpdate(hashPassword)
User.beforeBulkCreate(users => Promise.all(users.map(hashPassword)))
