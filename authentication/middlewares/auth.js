const {getUser} = require('../utils/auth');

async function restrictToLoggedUserOnly(req, res, next) {
  if (req.path.startsWith('/user')) {
    return next();
  }
  const userUid = req.cookies?.uuid;
  if (!userUid) {
    return res.redirect('/user/login');
  }
  const user = getUser(userUid);
  if (!user) {
    return res.redirect('/user/login');
  }
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedUserOnly
}
