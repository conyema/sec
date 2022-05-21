'use strict';

const fs = require('fs');
const path = require('path');
const debug = require('debug')('api:db');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// const config = require(__dirname + '/../config/config.json')[env];
const envConfigs = require('../config');
const config = envConfigs[env];
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
  if (sequelize) {
    debug('DB connection by URL a success');
  }
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  if (sequelize) {
    debug('DB connection by credentials a success');
  }
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
