import { DataTypes } from "sequelize";
import { sequelize } from "@utils";

export const Admin = sequelize.define("admin", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {}
    }
  }
);
