const cors = require("cors");
const express = require("express");
const dotenv = require('dotenv');
const debug = require('debug')('app:server');
// const fileUpload = require("express-fileupload");
const logger = require("morgan");
var path = require('path');

// const estates = require("./estate/routes");
// const parseForm = require("./util/parseForm");
const indexRoutes = require("./api/routes/index");
const featureRoutes = require("./api/routes/features");
const errorHandler = require("./api/util/errorHandler");

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
// Log requests to the console (for debugging)
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, 'public')));

// app.use(parseForm);
// app.use(fileUpload({
//   useTempFiles: true,
//   safeFileNames: true,
// }));

// Routes
app.use('/', indexRoutes);
app.use('/api/v1/', featureRoutes);
// app.use('/api/v1/estates', estates);

app.get('*', (req, res) => {
  res.json({ message: 'Welcome to the SEC Homepage!!!' });
});

// default error handler
app.use(errorHandler);

app.listen(port, () => {
  debug(`App running on port ${port}.`);
});

module.exports = app;
