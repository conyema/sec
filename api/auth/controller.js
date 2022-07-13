const dotenv = require("dotenv");
const debug = require("debug")("api:auth");
const bcrypt = require('bcrypt');

const {
  findUserByEmail,
  createUser
} = require('../../api/users/service');



const register = async (req, res, next) => {
  let newUser = req.body;
  let plainPassword = newUser.password;
  const { returnTo } = req.query;
  // const { referer } = req.headers;
  // const redirectUrl = returnTo || referer || '/';


  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    newUser.password = hashedPassword;

    const result = await createUser(newUser);
    // debug('new user:', newUser);

    // Redirect URL provided
    if (returnTo) {
      return res.redirect(returnTo);
    }

    res.status(201);
    return res.json({
      status: 'success',
      message: 'User account registered',
      // data: newUser
    });
  } catch (err) {
    debug(err);
    next(err);
    // req.flash("error", "Error creating a new account. Try a different login method.");
    // res.redirect("/manage/register")
  }
};

const login = async (req, res, next) => {
  const { returnTo } = req.query;
  // const { referer } = req.headers;

  const authenticated = req.isAuthenticated();
  // const redirectUrl = returnTo || referer || '/';

  // debug("authenticated - ", authenticated)
  res.locals.user = req.user;
  res.locals.verified = authenticated;


  try {
    // Redirect URL provided
    if (returnTo) {
      return res.redirect(returnTo);
    }

    res.status(200);
    return res.json({
      status: 'success',
      message: 'Login successful'
    });
  } catch (err) {
    debug(err);
    next(err);
  }
};

const logout = (req, res, next) => {
  const { returnTo } = req.query;
  // const { referer } = req.headers;

  // let returnTo = `${req.protocol}://${req.headers.host}`;
  // const redirectUrl = returnTo || referer || '/';

  // debug('mid', req.headers.referer, returnTo, req.headers.host);


  try {
    req.logout();

    // Redirect URL provided
    if (returnTo) {
      return res.redirect(returnTo);
    }

    res.status(200);
    return res.json({
      status: 'success',
      message: 'Logout successful'
    });
  } catch (err) {
    debug(err);
    next(err);
  }
};



module.exports = {
  register,
  login,
  logout
};
