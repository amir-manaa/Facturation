const { DataTypes } = require("sequelize");

const sequilize = require("../../util/db");

const Invoice = sequilize.define("invoice", {
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
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});

module.exports = Invoice;
