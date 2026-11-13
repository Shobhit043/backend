const express = require('express');
const {connectToDB} = require('./db/connect');
const {router} = require('./routes/url');
const {staticRouter} = require('./routes/static')
const {userRouter} = require('./routes/user')
const {router: adminRouter} = require('./routes/admin')
const path = require('path');
const {restrictToLoggedUserOnly, restrictToRole} = require('./middlewares/auth')
const cookieParser = require('cookie-parser')
const port = 8000;
const urlDB = 'mongodb://localhost:27017/db';


connectToDB(urlDB).then(() => {
  console.log("connected to mongodb");
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);

});

const app = express();

// views
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'))

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(restrictToLoggedUserOnly);

// routes
app.use('/user', userRouter);
app.use('/', restrictToRole(['normal', 'admin']), staticRouter);
app.use('/url', restrictToRole(['normal', 'admin']), router);
app.use('/admin', restrictToRole(['admin']), adminRouter);
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
