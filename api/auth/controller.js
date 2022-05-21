const dotenv = require("dotenv");
const debug = require("debug")("api:auth");
const bcrypt = require('bcrypt');

const parseForm = require('../../lib/parseForm');
const validate = require('../../lib/validate');
const validations = require('../../lib/validations');
const {
  findUserByEmail,
  createUser
} = require('../../api/users/service');



const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const data = {
    email,
    firstName,
    lastName,
    password: hashedPassword
  }

  try {
    // debug('DATA:', data);

    const newUser = await createUser(data);
    debug('newUser:', newUser);

    // res.json({
    //   status: 'success',
    //   message: 'user registered',
    //   data: newUser
    // });

    res.redirect("/manage/login")

  } catch (err) {
    debug(err);
    // next(err);
    // req.flash("error", "Error creating a new account. Try a different login method.");
    res.redirect("/manage/register")
  }
};


const login = async (req, res) => {
  const authenticated = req.isAuthenticated();
  debug("authed? - ", authenticated)
  res.locals.user = req.user;
  res.locals.verified = authenticated;

  res.redirect('/manage');
};

const logout = (req, res) => {
  // debug('Session-out', req.session);
  // req.logOut();
  req.logout();
  res.redirect('/');
};

// const logout = (req, res) => {
//   req.logOut();

//   let returnTo = `${req.protocol}://${req.headers.host}`;
//   // const port = req.connection.localPort;
//   const port = req.socket.localPort;


//   const logoutURL = new URL(
//     `https://${process.env.AUTH0_DOMAIN}/v2/logout`
//   );

//   // const searchString = querystring.stringify({
//   const searchString = new URLSearchParams({
//     client_id: process.env.AUTH0_CLIENT_ID,
//     returnTo: returnTo
//   });

//   logoutURL.search = searchString;

//   res.redirect(logoutURL);
// };



module.exports = {
  register,
  login,
  logout
};
