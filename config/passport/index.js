const LocalStrategy = require('passport-local').Strategy;
const userService = require('../../api/users/service');
const bcrypt = require('bcrypt');

function configure(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
  },
    async function (email, password, done) {
      try {
        const currentUser = await userService.findUserByEmail(email);
        // console.log("here", currentUser);

        if (!currentUser) {
          // return done(null, false, { message: `User with email ${email} does not exist` });
          // console.log("here1");
          return done(null, false);
        }

        //
        // if (currentUser.source != "local") {
        //   // return done(null, false, { message: `You have previously signed up with a different signin method` });
        //   console.log("here2");
        //   return done(null, false);
        // }

        // Password does not match
        if (!bcrypt.compareSync(password, currentUser.password)) {
          // return done(null, false, { message: `Incorrect password provided` });
          // console.log("here3");
          return done(null, false);
        }

        return done(null, currentUser);

      } catch (err) {
        // console.log("here4");
        return done(err, null);
      }
    }
  ));

  // Store user in (login) session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Retrieves user from (login) session
  passport.deserializeUser(async (userId, done) => {
    const currentUser = await userService.selectOneUser(userId);
    done(null, currentUser);
  });
}

module.exports = configure
