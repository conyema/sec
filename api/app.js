const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const debug = require('debug')('app:server');
// const fileUpload = require("express-fileupload");
const logger = require("morgan");

// const estates = require("./estate/routes");
const routes = require("./routes/index");
const errorHandler = require("./util/errorHandler");
// const parseForm = require("./util/parseForm");

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;

app.use(cors());
// Log requests to the console (for debugging)
app.use(logger('dev'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(parseForm);
// app.use(fileUpload({
//   useTempFiles: true,
//   safeFileNames: true,
// }));

// Routes to features
app.use('/api/v1/', routes);
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
