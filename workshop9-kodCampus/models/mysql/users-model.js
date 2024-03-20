const {Sequelize, DataTypes} = require('sequelize');

const User = Sequelize.define("users", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
 });
 