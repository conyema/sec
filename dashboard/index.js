const express = require("express");
const path = require('path');

const indexRouter = require("./routes/index");
// const dashboardRouter = require("./routes/dashboard");

const dashboard = express();


// View engine setup
dashboard.set('views', path.join(__dirname, 'views/pages'));
dashboard.set('view engine', 'pug');

// dashboard.use(express.static(path.join(__dirname, 'src'), { extensions: ['html'] }));

// sub-app router
dashboard.use('/', indexRouter);

dashboard.get('*', (req, res) => {
  res.redirect('/manage');
  // res.json({ message: 'Welcome to the SEC dashboard!!!' });
});

module.exports = dashboard;
