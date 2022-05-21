module.exports = (sequelize, DataTypes) => {
  const Estate = sequelize.define('estate', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM,
      values: ["land", "residential", "industrial", "commercial"],
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bedroom: {
      type: DataTypes.INTEGER,
    },
    bathroom: {
      type: DataTypes.INTEGER,
    },
    // floorSpace    Decimal? @db.Decimal(8,2)
    floorSpace: {
      // type: DataTypes.DECIMAL(8, 2),
      type: DataTypes.DECIMAL(10, 2),
    },
    measure: {
      type: DataTypes.ENUM,
      values: ["acre", "hectare", "sq ft", "sq m", "unit", "plot"],
      defaultValue: "unit",
      // allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(15, 2),
    },
    currency: {
      type: DataTypes.ENUM,
      values: ["naira", "dollar"],
      // allowNull: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    video: {
      type: DataTypes.STRING,
    }

  }, {
    freezeTableName: true
  }, {})

  Estate.associate = (models) => {
    Estate.belongsTo(models.user, {
      foreignKey: 'authorId',
      as: 'author',
    })
    Estate.hasMany(models.photo, {
      foreignKey: 'estateId',
      as: 'photos',
      onDelete: 'CASCADE',
    })
  }

  return Estate;
}
