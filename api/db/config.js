const { Pool } = require('pg');
// const debug = require('debug')('app:database');
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
  const client = await pool.connect();
  try {
  // const client = new pg.Client(pool);
    client.query('SELECT NOW() AS "theTime"', (error) => {
      if (error) {
        return console.log('error running query', error);
      }
      console.log('Database Connected');
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

const clientQuery = async (queryText) => {
  const client = await pool.connect();
  try {
    await client.query(queryText);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
};


const poolQuery = (text, params) => {
  return pool.query(text, params);
}

testDatabase();

module.exports = {
  // query: (text, params) => pool.query(text, params),
  clientQuery,
  poolQuery,
  pool
}
