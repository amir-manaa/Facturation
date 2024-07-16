import { Customer } from "../../models/customer";
import { Request ,Response } from 'express';

// login Customer
export const loginCustomer = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const customer = await Customer.findOne({
    where: {
      email: email,
      password: password
    }
  });

  if (!customer) {
    return res.status(404).json({
      status: "fail",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      customer
    },
  });
};