const { DataTypes } = require("sequelize");
const { createDB } = require("../config/db");

const Notice = createDB.define(
  "notice",
  {
    id: {
      primaryKey: true,
      allowNull: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    author: DataTypes.STRING,
    message: DataTypes.STRING,
    date: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Notice;
