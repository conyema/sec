const express = require("express");
const estates = require("./estates/router");
const users = require("./users/router");
// const auth = require("./auth/router");
// const { connectDB } = require("./db/configMongodb");

const api = express();

// Connect to the Database(MongoDB)
// connectDB();

// api routes
api.use('/estates', estates);
api.use('/users', users);
// api.use('/auth', auth);

api.use('*', (req, res) => {
  // res.redirect('/');
  // res.redirect('/api/v1');
  res.json({ message: 'Welcome to the SEC API!!!' });
});

module.exports = api;
