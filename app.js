// Environment configuration
const dotenv = require('dotenv');
dotenv.config();

// Import necessary packages
const cors = require("cors");
const express = require("express");
const debug = require('debug')('api:server');
const logger = require("morgan");
const path = require('path');
// const csrf = require('csurf');
const helmet = require("helmet");
const passport = require("passport");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Configuration and helper modules
const passportConfig = require('./config/passport');
const errorHandler = require("./lib/errorHandler");
const db = require('./config/sequelize/models');


// Routers
const api = require("./api");
const dashboard = require("./dashboard");
// const web = require("./web");


// Initalize sequelize with session store
const sessionStore = new SequelizeStore({
  db: db.sequelize,
});
sessionStore.sync();


const app = express();
const port = process.env.PORT || 4000;

// Configure passport
passportConfig(passport);

// Session options
const oneDay = 1000 * 60 * 60 * 24;
const sessOptions = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: oneDay,
    secure: true,
  },
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
};


// app.use('/static', express.static('web/src'))
// app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'dashboard/src')));


// Middlewares for production env.
app.use(helmet());
app.use(cors());
app.use(logger('combined'));
app.use(express.json());
app.use(
  express.urlencoded({
    // extended: true,
    extended: false,
  })
);

app.use(session(sessOptions));

app.use(passport.initialize());
app.use(passport.session());

// After session
// app.use(csrf());

// Sub-apps and routes
// app.use('/v1', api);
app.use('/manage', dashboard);
app.use('/', api);


app.get('*', (req, res) => {
  res.redirect('/');
});

// app.get('*', (req, res) => {
//   res.json({ message: 'Welcome to the SEC!!!' });
// });

// Default error handler
app.use(errorHandler);

// Start api server
app.listen(port, () => {
  debug(`Api server running on port ${port}.`);
});

module.exports = app;
