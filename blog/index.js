const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/user');
const mongoose = require('mongoose');
const authMiddleware = require('./middlwares/auth');
const Blog = require('./models/blog');
const port = 8000;
const dbURL = 'mongodb://localhost:27017/blogify';
const blogRouter = require('./routes/blog');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbURL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use('/blog', authMiddleware, blogRouter);
app.use('/user', router);

app.get('/', authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.render('home', { name: req.user && req.user.name ? req.user.name : '', blogs });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => console.log(`srever started on port ${port}`));
