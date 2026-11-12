const express = require('express');
const User = require('../db/models/user');
const {handleUserSignup, handleUserLogin} = require('../controllers/user');
const userRouter = express.Router();

userRouter.post('/signup', handleUserSignup);
userRouter.post('/login', handleUserLogin);

module.exports = {
  userRouter
}
