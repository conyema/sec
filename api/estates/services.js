const { uploadOneFile } = require('../util/fileStore');
const renameFile = require('../util/renameFile');
const { poolQuery, getOneEntity } = require('../db/config');
// const { json } = require('express');

/**
 * Handle database and external API calls here
 */

const selectAllEstates = async () => {
  return  poolQuery(`
  SELECT estateId, name, description, city, type, status, media -> 'poster' AS poster
  FROM estate
  INNER JOIN location USING(locationId)
  INNER JOIN estateType USING(estateTypeId)
  INNER JOIN estateStatus USING(estatestatusId)
  ORDER BY estateId
  LIMIT 20;
  `);
}

const selectOneEstate = async (id) => {

  return  poolQuery(`
    SELECT estateId, name, city, type, status, description, bedroom, bathroom, balcony, balconySpace, garage, parkingSpace, petsAllowed, media
    FROM estate
    INNER JOIN location l USING(locationId)
    INNER JOIN estateType et USING(estateTypeId)
    INNER JOIN estateStatus es USING(estatestatusId)
    WHERE estateId = $1;`,
    [id]
  );
}

const createEstate = async (data) => {
  const { name, description, locationId, estateTypeId, estateStatusId, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed = false} = data;

  return  poolQuery(`
    INSERT INTO estate
      (name, description, locationId, estateTypeId, estateStatusId, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING estateId, name;`,
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
    RETURNING *;`,
    [name, description, locationId, estateTypeId, estateStatusId, floorSpace, balcony, balconySpace, bedroom, bathroom, garage, parkingSpace, petsAllowed, id]
  );
}

const deleteEstate = async (id) => {

  return  poolQuery(`
    DELETE FROM estate
    WHERE estateId = $1;`,
    [id]
  );
}

const uploadFile = async (id, path, tag) => {
  // check id validity before file(s) upload
  const result = await getOneEntity(id, 'estate', 'estateId');
  const safeTag = renameFile(tag);
  const safeTagId = `${renameFile(tag)}${id}`;


  if ( result.rowCount === 0 ) {
    return result;
  } else {
    // upload file with tag nad ID for unique identification
    const uploadData = await uploadOneFile(path, safeTagId);
    const  jsonValue = `${uploadData}`;
    const jsonPath = `{${safeTag}}`;

    return  poolQuery(`
      UPDATE estate
      SET media = jsonb_set(coalesce(media, '{}'), $2, $3)
      WHERE estateId = $1
      RETURNING estateId, name, media;`,
      [id, jsonPath, jsonValue]
    );
  }
}

module.exports = {
  createEstate,
  deleteEstate,
  selectAllEstates,
  selectOneEstate,
  updateEstate,
  uploadFile,
}
