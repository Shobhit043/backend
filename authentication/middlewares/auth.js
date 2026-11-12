async function restrictToLoggedUserOnly(req, res, next) {
  const userUid = req.cookies.uid;
  if (!userUid) {
    return res.redirect('/login');
  }
}
