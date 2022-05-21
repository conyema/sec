const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");

const {
  login,
  logout,
  register
} = require('./controller');


const router = express.Router();



/**
 * Routes Definitions
 */

router.post("/local/register", register);

router.post("/local/login",
  passport.authenticate("local", {
    // successRedirect: "/manage",
    failureRedirect: "/manage/login",
    // failureFlash: true
    // successReturnToOrRedirect: '/',
    // failureRedirect: '/manage/login',
    failureMessage: true
  }),
  login
);

router.get("/logout", logout);


module.exports = router;
