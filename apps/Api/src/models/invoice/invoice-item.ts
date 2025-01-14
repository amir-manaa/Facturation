import { DataTypes } from 'sequelize';
import { sequelize } from '../../utils';

export const InvoiceItem = sequelize.define('invoiceItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  quantity: {
    type: DataTypes.SMALLINT,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0,
  }
});
