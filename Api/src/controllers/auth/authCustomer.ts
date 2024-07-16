import { Request ,Response } from 'express';
import { Customer } from "../../models/customer";
import { Security } from '../../utils/security';

const security = new Security();

// login Customer
export const loginCustomer = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({
    where: { email: email }
  });

  if (!customer) {
    return res.status(404).json({
      status: "fail",
    });
  }

  if (!customer) {
    return res.status(401).json({
      status: "Authentication failed",
    });
  }

  const isMatchedPassword = await security.matchPassword(password, customer['password']);
  if (!isMatchedPassword) {
    return res.status(401).json({
      status: "Authentication failed",
    });
  }

  const token = security.generateAccessToken(email, customer['role']);
  res.cookie('jwt', token, {httpOnly: true, maxAge: 79200});
  res.status(200).json({
    status: "success",
    data: {
      customer,
      token
    },
  });
};