const cors = require("cors");
const express = require("express");
const dotenv = require('dotenv');
const debug = require('debug')('app:server');
// const fileUpload = require("express-fileupload");
const logger = require("morgan");
// const path = require('path');
const helmet = require("helmet");


const errorHandler = require("./util/errorHandler");

const api = require("./api");
const dashboard = require("./dashboard");
// const web = require("./web");


// environment configuration
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// middlewares for production env.
app.use(helmet());
app.use(cors());
app.use(logger('combined'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


// sub-apps and routes
app.use('/v1', api);
app.use('/manage', dashboard);
// app.use('/api/v1', api);
// app.use('/manage', dashboard);
// app.use('/', web);
// app.use('/api/v1', api);

// app.get('*', (req, res) => {
//   res.json({ message: 'Welcome to the SEC!!!' });
// });

// default error handler
app.use(errorHandler);

// start app server
app.listen(port, () => {
  debug(`Api running on port ${port}.`);
});

module.exports = app;
