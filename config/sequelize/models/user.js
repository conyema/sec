module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "staff", "user", "owner"],
      allowNull: false,
      defaultValue: "user",
    },
  }, {
    freezeTableName: true,
  })

  User.associate = (models) => {
    User.hasMany(models.estate, {
      foreignKey: 'authorId',
      as: 'estates',
      // onDelete: 'CASCADE',
    })
    // User.hasOne(models.Profile, {
    //   onDelete: 'CASCADE',
    //   foreignKey: 'userId',
    // })
  }

  return User;
}
