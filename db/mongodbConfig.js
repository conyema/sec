/**
 * Configuration for MongoDB database using the mongoose module
 */

const mongoose = require('mongoose');
const debug = require('debug')('app:database');
const dotenv = require('dotenv');

dotenv.config();

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

// const db = mongoose.connect(process.env.MONGODB_URI, options)
//   .then(() => {
//     debug('Connected to MongoDB...1')
//   })
//   .catch((error) => {
//     debug('Unable to connect to MongoDB...');
//     debug(error);
//   });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, options);
    debug('Connected to MongoDB...')
  } catch (error) {
    debug('Unable to connect to MongoDB...');
    debug(error.message);
  }
};

// const db = async (queryText) => {
//   const client = await pool.connect();
//   try {
//     await client.query(queryText);
//   } catch (err) {
//     debug(err);
//   } finally {
//     client.release();
//   }
// };

// module.exports = { db };

module.exports = { connectDB };
