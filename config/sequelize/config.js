const debug = require('debug')('api:orm');
const dotenv = require('dotenv');
dotenv.config()

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'mysql',
    // logging: false,
    logging: msg => debug(msg),
  },
  test: {
    // url: process.env.TEST_DATABASE_URL,
    url: process.env.DEV_DATABASE_URL,
    dialect: 'mysql',
    logging: msg => debug(msg),
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'mysql',
    logging: msg => debug(msg),
  },
}
