const { uploadOneFile } = require('../util/fileStore')
const { poolQuery } = require('../db/config');

/**
 * Handle database and external API calls here
 */

const selectAllEstates = async () => {
  return  poolQuery(`
  SELECT estateId, e.name, description, l.city, et.type, es.status
  FROM estate e
  INNER JOIN location l USING(locationId)
  INNER JOIN estateType et USING(estateTypeId)
  INNER JOIN estateStatus es USING(estatestatusId)
  ORDER BY estateId
  LIMIT 20;
  `);
}

const createEstate = async (data, image) => {
  const { public_id: thumbnailId, secure_url: thumbnailUrl } = await uploadOneFile(image);
  const { name, description, locationId, estateTypeId, estateStatusId, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed } = data;

  // console.log(public_Id, secure_url);
  console.log(data)

  return  poolQuery(`
    INSERT INTO estate
      (name, description, locationId, estateTypeId, estateStatusId, thumbnailId, thumbnailUrl, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
    RETURNING estateId, name`,
    [name, description, locationId, estateTypeId, estateStatusId, thumbnailId, thumbnailUrl, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed]
  );

}

module.exports = {
  createEstate,
  selectAllEstates
}
