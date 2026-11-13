const User = require('../db/models/user');
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../utils/auth')

function handleGetLogin(req, res) {
  return res.render('login');
}

function handleGetSignup(req, res) {
  return res.render('signup');
}

async function handleUserLogin(req, res) {
  const {email, password} = req.body;
  let user;
  try {
    user = await User.findOne({
      email, password
    })
  }
  catch (error) {
    return res.status(500).json({"error": error});
  }
  if (!user) {
    return res.render('login', {
      error: "Invalid username or password"
    });
  }
  console.log(user);
  token = setUser(user);
  res.cookie('uuid', token);
  res.redirect('/');
}

async function handleUserSignup(req, res) {
  const {name, email, password} = req.body;
  try {
    await User.create({
      name: name,
      email: email,
      password: password
    });
  }
  catch (error) {
    res.status(500).json({"error": error});
    return;
  }
  res.redirect('/user/login');
}

module.exports = {
  handleUserLogin,
  handleUserSignup,
  handleGetLogin,
  handleGetSignup
}
