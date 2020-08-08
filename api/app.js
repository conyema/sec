const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan")
const dotenv = require('dotenv');
const debug = require('debug')('app:server');
// const fileUpload = require("express-fileupload");

// const estates = require("./estate/routes");
const routes = require("./routes/index");
const errorHandler = require("./util/errorHandler");

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
  }),
);

// app.use(fileUpload({
//   useTempFiles: true,
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
