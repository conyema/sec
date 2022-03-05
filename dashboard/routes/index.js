const express = require('express');
const router = express.Router();
const { selectAllEstates, selectOneEstate } = require("../../api/estates/service");


/** Routes **/

// TODO: User auth
// router.use();

// Home

// router.get('/', (req, res) => {
//   res.json({ client: req.headers["user-agent"] });
//   // res.render('dashboard');
//   // res.redirect('/admin');
// });

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/estates', async (req, res) => {
  const estates = await selectAllEstates();

  res.render('estates', {
    // title: 'Projects',
    estates
  });
});

router.get('/estates/:id', async(req, res) => {
  const estate = await selectOneEstate(req.params.id, true);
  // res.json(estate);
  res.render('estate-view', {
    estate
  });
});

router.get('/new-estate', (req, res) => {
  res.render('estate-add');
});

router.get('/edit-estate/:estateId', async(req, res) => {
  const { estateId } = req.params;

  const estate = await selectOneEstate(estateId, true);

  res.render('estate-edit', {
    ...estate
  });
});

router.get('/new-image/:estateId', (req, res) => {
  const { estateId } = req.params;

  res.render('img-add', {
    _id: estateId
  });
});



// router.get('/estate', (req, res) => {
//   res.render('d-projects', {
//     title: 'Projects',
//     user: { initials: 'CO', idAdmin: false },
//     projects
//   });
// });

module.exports = router;
