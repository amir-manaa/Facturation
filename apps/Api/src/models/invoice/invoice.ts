import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils';

export const Invoice = sequelize.define('invoice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
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
