import { Request ,Response } from 'express';
import { User } from "@models/user";
import { Security } from '@utils/security';

// login User
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email }
  });

  if (!user) {
    return res.status(404).json({
      status: "fail",
    });
  }

  if (!user) {
    return res.status(401).json({
      status: "Authentication failed",
    });
  }

  const isMatchedPassword = await Security.matchPassword(password, user['password']);
  if (!isMatchedPassword) {
    return res.status(401).json({
      status: "Authentication failed",
    });
  }

  const token = Security.generateAccessToken(email, user['role']);
  res.cookie('jwt', token, {httpOnly: true, maxAge: 79200});
  res.status(200).json({
    status: "success",
    data: {
      user,
      token
    },
  });
};