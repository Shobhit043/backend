const {getUser} = require('../utils/auth');
const User = require('../db/models/user');

async function restrictToLoggedUserOnly(req, res, next) {
  const userUid = req.cookies?.uuid;
  const session = getUser(userUid);
  if (!session?._id) return next();

  try {
    const user = await User.findById(session._id).select('_id name email role');
    if (user) req.user = user;
    else res.clearCookie('uuid');
  } catch (error) {
    return next(error);
  }
  return next();
}

function restrictToRole(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect('/user/login');
    if (!roles.includes(req.user.role)) return res.status(403).send('Forbidden');
    return next();
  }
}

module.exports = {
  restrictToLoggedUserOnly,
  restrictToRole
}
