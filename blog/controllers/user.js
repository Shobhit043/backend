const User = require('../models/user');

const signinGet = (req, res) => {
  return res.render('signin', {
    name: '',
    error: req.query.error ? String(req.query.error) : '',
  });
};

const signinPost = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error('email and password are required');
    }
    const token = await User.findUserAndGenerateToken(email, password);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    return res.redirect('/');
  } catch (error) {
    console.log(error);
    return res.redirect(`/user/signin?error=${encodeURIComponent(error.message)}`);
  }
};

const signupGet = (req, res) => {
  return res.render('signup', {
    name: '',
    error: req.query.error ? String(req.query.error) : '',
  });
};

const signupPost = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      throw new Error('full name, email and password are required');
    }
    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect('/user/signin');
  } catch (error) {
    console.log(error);
    return res.redirect(`/user/signup?error=${encodeURIComponent(error.message)}`);
  }
};

const signoutPost = (req, res) => {
  // Always clear the cookie by its name, whether or not it was present.
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
  });
  return res.redirect('/user/signin');
};
module.exports = {
  signinGet,
  signinPost,
  signupGet,
  signupPost,
  signoutPost,
};
