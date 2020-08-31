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

const createEstate = async (data) => {
  const { name, description, locationId, estateTypeId, estateStatusId, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed } = data;

  return  poolQuery(`
    INSERT INTO estate
      (name, description, locationId, estateTypeId, estateStatusId, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING estateId, name`,
    [name, description, locationId, estateTypeId, estateStatusId, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed]
  );
}

const updateEstate = async (id, data) => {
  const { name, description, locationId, estateTypeId, estateStatusId, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed } = data;

  return  poolQuery(`
    UPDATE estate
      SET name = $1, description = $2, locationId = $3, estateTypeId = $4, estateStatusId = $5, floorSpace = $6,
      balcony = $7, balconySpace = $8, bedroom = $9, bathroom = $10, garage = $11, parkingSpace = $12, petsAllowed = $13
    WHERE estateId = $14
    RETURNING *`,
    [name, description, locationId, estateTypeId, estateStatusId, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed, id]
  );
}

module.exports = {
  createEstate,
  selectAllEstates,
  updateEstate
}
