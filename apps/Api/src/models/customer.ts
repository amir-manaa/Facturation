import { DataTypes } from 'sequelize';
import { sequelize } from '../utils';
import { Role } from '../shared/enums';

export const Customer = sequelize.define(
  'customer',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT('long'),
      allowNull: true,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Role.customer
    },
  }
);
