import { DataTypes } from "sequelize";
import { sequelize } from "../../utils";

export const Invoice = sequelize.define("invoice", {
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
