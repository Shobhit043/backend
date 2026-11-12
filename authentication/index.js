const express = require('express');
const {connectToDB} = require('./db/connect');
const {router} = require('./routes/url');
const {staticRouter} = require('./routes/static')
const {userRouter} = require('./routes/user')
const path = require('path');

const port = 8000;
const urlDB = 'mongodb://localhost:27017/db';


connectToDB(urlDB).then(() => {
  console.log("connected to mongodb");

  const app = express();

  // views
  app.set("view engine", "ejs");
  app.set("views", path.resolve('./views'))

  // middleware
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  // routes
  app.use('/', staticRouter);
  app.use('/url', router);
  app.use('/user', userRouter);
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});
