import { Request ,Response } from 'express';
import { Model } from 'sequelize';
import { Admin } from '@models/admin';
import { Security } from '@utils/security';
import { IAdmin } from '@interfaces/'

const security = new Security();

// login Admin
export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body 
  const admin: Model<IAdmin> = await Admin.scope('withPassword').findOne({
    where: { email: email }
  });

  if (!admin) {
    return res.status(401).json({
      status: "Authentication failed",
    });
  }

  const isMatchedPassword = await security.matchPassword(password, admin['password']);
  if (!isMatchedPassword) {
    return res.status(401).json({
      status: "Authentication failed",
    });
  }

  const token = security.generateAccessToken(admin.dataValues.id, admin.dataValues.role);
  res.cookie('token', `bearer ${token}`, {httpOnly: true, maxAge: 79200});

  res.status(200).json({
    status: "success",
    data: {
      admin,
      token
    },
  });
};