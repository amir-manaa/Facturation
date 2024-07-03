const { DataTypes } = require("sequelize");

const sequilize = require("../util/db");

const Bill = sequilize.define("bill", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  totalNoTax: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  },
});

module.exports = Bill;
