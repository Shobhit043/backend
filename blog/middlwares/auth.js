const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
  // Get token from cookies
  const token = req.cookies?.token;

  // If no token, redirect to login page (signin route)
  if (!token) {
    return res.redirect('/user/signin');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'thisisprivatekey');
    // Attach user info to request for use in route handlers
    req.user = decoded;
    // Valid token — proceed to route handler (which renders home)
    next();
  } catch (error) {
    // If token is invalid, clear it and redirect to login
    res.clearCookie('token');
    return res.redirect('/user/signin');
  }
};