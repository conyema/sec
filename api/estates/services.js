const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

const { query } = require('../db/config');

dotenv.config();
cloudinary.config({
  cloud_name: 'owi',
  api_key: '139187219659792',
  api_secret: process.env.API_SECRET,
});

/**
 * Handle database and external API calls here
 */

const selectAllEstates = () => {
  // return await selectAll('property', 2);
  // let estate = await sequelize.query(`SELECT * FROM propertis LIMIT 2`);
  // return await models.Es.findAll({
  //   limit: 20
  // });
  // const client = await pool.connect();
  // try {
  //   query(`SELECT * FROM employee LIMIT 20`);
  // } catch (error) {
  //   console.log(error);
  // } finally {
  //   console.log('done!!!');
  //   client.release();
  // }
  // return await client.query(`SELECT * FROM estate LIMIT 20`);
  return  query(`SELECT * FROM employee LIMIT 20`);
}

// const selectAllEstates = () => {
//   return  query(`SELECT * FROM employee LIMIT 20`);
// }

module.exports = {
  selectAllEstates,
}
