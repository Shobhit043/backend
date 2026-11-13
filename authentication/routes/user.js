const express = require('express');
const User = require('../db/models/user');
const {handleUserSignup, handleUserLogin, handleGetLogin, handleGetSignup} = require('../controllers/user');
const userRouter = express.Router();

userRouter.get('/login', handleGetLogin);
userRouter.get('/signup', handleGetSignup);
userRouter.post('/signup', handleUserSignup);
userRouter.post('/login', handleUserLogin);

module.exports = {
  userRouter
}
