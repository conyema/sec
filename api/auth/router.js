const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");

// const parseForm = require('../../lib/parseForm');
const validateInputs = require('../../lib/validate');
const { queryAuth } = require('../../lib/validations');
const {
  login,
  logout,
  register
} = require('./controller');


const router = express.Router();



/**
 * Routes Definitions
 */

// Create a user
// router.post('/', [parseForm, checkUser, validateInputs, postUser]);

// router.post("/local/register", register);

router.post("/local/login",
  queryAuth,
  validateInputs,
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

router.get("/logout", queryAuth, validateInputs, logout);


module.exports = router;
