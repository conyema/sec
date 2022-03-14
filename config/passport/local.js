const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userService = require('../../api/users/service');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
  async function (email, password, done) {
    const currentUser = await userService.findUserByEmail(email);
    console.log("here", currentUser);

    if (!currentUser) {
      return done(null, false, { message: `User with email ${email} does not exist` });
    }

    if (currentUser.source != "local") {
      return done(null, false, { message: `You have previously signed up with a different signin method` });
    }

    if (!bcrypt.compareSync(password, currentUser.password)) {
      return done(null, false, { message: `Incorrect password provided` });
    }
    return done(null, currentUser);
  }
));
