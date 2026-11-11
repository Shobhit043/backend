const express = require('express');
const { connectToDB } = require('./db/connect')
const { router } = require('./routes/url')
const port = 8000;
const urlDB = 'mongodb://localhost:27017/db';

const app = express();

connectToDB(urlDB);
console.log("connected to mongodb");

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
