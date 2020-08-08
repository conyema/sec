const { sequelize } = require('../database/models/index');
const { models } = require('../database/models/index');

const selectAll = async function (tableName, limit = 'ALL', columns = '*') {
  // const client = new Client(getConnection())
  // await client.connect()

  // return await models.property.findAll();

  return await sequelize.query(`SELECT ${columns} FROM ${tableName} LIMIT ${limit}`);
}

const insertOne = async function (tableName, itemName, price) {

  return await sequelize.query(`INSERT INTO ${tableName} (name, price) VALUES ('${itemName}', '${price}');`)
}

module.exports = {
  selectAll,
  insertOne
};
