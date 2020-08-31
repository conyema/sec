const { Pool } = require('pg');
const debug = require('debug')('app:database');
const dotenv = require('dotenv');

dotenv.config();
let pool;

if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
} else {
  pool = new Pool({
    connectionString: process.env.TEST_DATABASE_URL
    // user: process.env.PGUSER,
    // host: 'localhost',
    // database: process.env.PGDATABASE,
    // password: process.env.PGPASSWORD,
    // port: process.env.PGPORT,
  });
}

const testDatabase = async () => {
  await clientQuery('SELECT NOW() AS "theTime"')
  .then(debug('DB connected'));
};

const clientQuery = async (queryText) => {
  const client = await pool.connect();
  try {
    await client.query(queryText);
  } catch (err) {
    debug(err);
  } finally {
    client.release();
  }
};


const poolQuery = (text, params) => {
  return pool.query(text, params);
};

// const getAllEntity = (id, entity, limit='ALL') => {
//   return pool.query(
//     `SELECT *
//     FROM ${entity}
//     ORDER BY ${entity}Id
//     LIMIT ${limit};`
//   );
// };

// const getOneEntity = (id, entity, limit='ALL') => {
//   return pool.query(
//     `SELECT *
//     FROM ${entity}
//     WHERE ${entity}Id = ${id};`
//   );
// };

// const deleteAllEntity = (id, entity, limit='ALL') => {
//   return pool.query(
//     `SELECT *
//     FROM ${entity}
//     ORDER BY ${entity}Id
//     LIMIT ${limit};`
//   );
// };

// const deleteOneEntity = (id, entity, limit='ALL') => {
//   return pool.query(
//     `DELETE *
//     FROM ${entity}
//     WHERE ${entity}Id = ${id};`
//   );
// };

// test database connection
testDatabase();

module.exports = {
  // query: (text, params) => pool.query(text, params),
  clientQuery,
  // deleteAllEntity,
  // deleteOneEntity,
  // getAllEntity,
  // getOneEntity,
  poolQuery,
  pool
}
