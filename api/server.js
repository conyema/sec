const express = require("express");

const app = express();
const port = process.env.PORT || '4000';

app.use('/', (req, res) => {
    res.json({message: 'Welcome to the Stella ebams consulting!!!' });
});

app.use('*', (req, res) => {
  res.send(
    'error 404 !!!'
  )
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
