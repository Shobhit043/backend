const User = require('../db/models/user');
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../utils/auth')

async function handleUserLogin(req, res) {
  const {email, password} = req.body;
  const user = await User.findOne({
    email, password
  });
  if (!user) {
    return res.render('login', {
      error: "Invalid username or passwor"
    })
  }
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie('uuid', sessionId);
  res.redirect('/');
}

async function handleUserSignup(req, res) {
  const {name, email, password} = req.body;
  await User.create({
    name: name,
    email: email,
    password: password
  });
  res.redirect('/');
}

module.exports = {
  handleUserLogin,
  handleUserSignup
}
