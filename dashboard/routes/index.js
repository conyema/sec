const express = require('express');
const router = express.Router();
const axios = require('axios');
const debug = require("debug")("api:admin-route");
const { selectAllEstates, selectOneEstate } = require("../../api/estates/service");
const { selectAllUsers, selectOneUser } = require("../../api/users/service");
const secured = require('../../lib/secured');


/** Routes **/


// router.get('/', (req, res) => {
//   res.json({ client: req.headers["user-agent"] });
//   // res.render('dashboard');
//   // res.redirect('/admin');
// });

router.use((req, res, next) => {
  const authenticated = req.isAuthenticated();
  const hostUrl = `${req.protocol}://${req.headers.host}`;

  // debug("Oauthed:- ", authenticated);

  res.locals.user = req.user;
  res.locals.verified = authenticated;
  res.locals.hostUrl = hostUrl;
  req.hostUrl = hostUrl;

  next();
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/', (req, res) => {
  res.render('index');
});

router.use(secured);

router.get('/estates', async (req, res, next) => {


  try {
    // const { data } = await axios('http://localhost:4000/api/v1/estates');
    // const response = await axios(`${req.hostUrl}/v1/estates`);
    // const { data = [] } = response.data;
    const response = await selectAllEstates();
    const { rows } = JSON.parse(JSON.stringify(response));

    // debug('data', rows);

    res.render('estates', {
      // title: 'Projects',
      estates: rows
    });
  } catch (err) {
    debug(err);
    next(err);
  }
});

router.get('/users', async (req, res, next) => {


  try {
    const response = await selectAllUsers();
    const data = JSON.parse(JSON.stringify(response));

    // debug('data', data);

    res.render('users', {
      userList: data
    });
  } catch (err) {
    debug(err);
    next(err);
  }
});

router.get('/estates/:estateId', async (req, res, next) => {
  const { estateId } = req.params

  try {
    // const response = await axios(`${req.hostUrl}/v1/estates/${estateId}`);
    // const { data = [] } = response.data;
    const response = await selectOneEstate(estateId);
    const data = response.toJSON();

    // debug('data', data);

    res.render('estate-view', {
      estate: data
    });
  } catch (err) {
    debug(err);
    next(err);
  }
});

router.get('/users/:userId', async (req, res, next) => {
  const { userId } = req.params

  try {
    const response = await selectOneUser(userId);
    const data = response.toJSON();

    debug('data', data);

    res.render('user-view', {
      userDetails: data
    });
  } catch (err) {
    debug(err);
    next(err);
  }
});

router.get('/new-estate', (req, res) => {
  res.render('estate-add');
});

router.get('/new-user', (req, res) => {
  res.render('register');
});

router.get('/edit-estate/:estateId', async (req, res, next) => {
  const { estateId } = req.params;

  try {
    // const estate = await selectOneEstate(estateId, true);
    // const response = await axios(`${req.hostUrl}/v1/estates/${estateId}`);
    // const { data = [] } = response.data;
    const response = await selectOneEstate(estateId);
    const data = response.toJSON();

    res.render('estate-edit', {
      ...data
    });
  } catch (err) {
    debug(err);
    next(err);
  }
});

router.get('/edit-user/:userId', async (req, res, next) => {
  const { userId } = req.params;

  try {
    const response = await selectOneUser(userId);
    const data = response.toJSON();

    res.render('user-edit', {
      ...data
    });
  } catch (err) {
    debug(err);
    next(err);
  }
});

router.get('/new-image/:estateId', (req, res) => {
  const { estateId } = req.params;

  res.render('img-add', {
    id: estateId
  });
});



// router.get('/estate', (req, res) => {
//   res.render('d-projects', {
//     title: 'Projects',
//     user: { initials: 'CO', isAdmin: false },
//     projects
//   });
// });

module.exports = router;
