const passport = require('passport');
const Auth0Strategy = require("passport-auth0");
// const userService = require('../../api/users/service');
// const bcrypt = require('bcrypt');


const auth0 = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    /**
     * Access tokens are used to authorize users to an API
     * (resource server)
     * accessToken is the token to call the Auth0 API
     * or a secured third-party API
     * extraParams.id_token has the JSON Web Token
     * profile has all the information from the user
     */
    debug('AT', accessToken);
    // debug('RT', refreshToken);
    // debug('EP', extraParams);
    debug('P', profile._json);

    return done(null, profile);
  }
);
passport.use(auth0);
