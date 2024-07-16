import { Admin } from '../../models/admin';
import { Request ,Response } from 'express';

// login Admin
export const loginAdmin = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const admin = await Admin.findOne({
    where: {
      email: email,
      password: password
    }
  });

  if (!admin) {
    return res.status(404).json({
      status: "fail",
    });
  }

  res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=3600; HttpOnly');
  res.status(200).json({
    status: "success",
    data: {
      admin
    },
  });
};