module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('photo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Photo.associate = (models) => {
    Photo.belongsTo(models.estate, {
      foreignKey: 'estateId',
      as: 'estate',
    })
  }

  return Photo;
}
