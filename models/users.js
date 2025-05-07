'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helpers/crypto');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.History, { foreignKey: "userId" })
      Users.hasMany(models.Jsondata, { foreignKey: "userId" })
    }
  }
  Users.init({
    username: {
      type: DataTypes.STRING,
      unique: { msg: "Username is already taken!" },
      allowNull: false,
      validate: {
        notNull: { msg: "Username cannot be empty!" },
        notEmpty: { msg: "Username cannot be empty!" },
      }
    },
    password: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: { msg: "Password cannot be empty!" },
        notEmpty: { msg: "Password cannot be empty!" },
      }
    },
    address: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: false,
      validate: {
        notNull: { msg: "Address cannot be empty!" },
        notEmpty: { msg: "Address cannot be empty!" },
      }
    },
  }, {
    sequelize,
    modelName: 'Users',
    hooks: {
      beforeCreate: (instance) => {
        const hashedPassword = hash(instance.password)
        instance.password = hashedPassword
      }
    }
  });
  return Users;
};