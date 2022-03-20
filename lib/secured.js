module.exports = async (req, res, next) => {
  // console.log("authed:- ", req.isAuthenticated());
  const authenticated = req.isAuthenticated();

  // res.locals.user = req.user;
  res.locals.verified = authenticated;

  console.log("LOKALS:- ", res.locals.verified);
  console.log("authed:- ", authenticated);

  if (req.user) {

    return next();
  }

  req.session.returnTo = req.originalUrl || req.url;

  // console.log('RETURN_TO:', req.session.returnTo);
  // console.log('Original_Url:', req.originalUrl);

  res.redirect("/manage/login");
};
