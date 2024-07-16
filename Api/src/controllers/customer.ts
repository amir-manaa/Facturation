import { Customer } from "../models/customer";
import { Request ,Response } from 'express';
import { hashPassword } from '../utils/helpers';

// fetch Customers
export const getCustomers = async (req: Request, res: Response) => {
  const customers = await Customer.findAll();
  res.status(200).json({
    status: "success",
    length: customers.length,
    data: {
      customers,
    },
  });
};

// fetch customer by id
export const getCustomer = async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findByPk(id);

  if (!customer) {
    return res.status(404).json({
      status: "fail",
    });
  } else {
    return res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  }
};

// Add new customer
export const addCustomer = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const password = await hashPassword(req.body.password);
  const customer = Customer.create({
    email: email,
    name: name,
    phone: phone,
    address: address,
    password: password,
  });

  if (customer) {
    return res.status(200).json({
      status: "success",
      data: {
        customer,
      },
    });
  } else {
    return res.status(500).json({
      status: "fail",
    });
  }
};

//delete customer
export const deleteCustomer = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const customer = await Customer.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
};

// update customer
export const updateCustomer = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const customer = await Customer.findByPk(id);
  if (!customer) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;

  const updatedCustomer = await Customer.update(
    {
      email: email,
      name: name,
      phone: phone,
      address: address,
    },
    {
      where: { id: id },
    }
  );

  if (updatedCustomer) {
    return req.status(200).json({
      status: "success",
      data: {
        updatedCustomer,
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
    });
  }
};

// update customer password
export const updateCustomerPassword = async (req, res) => {
  const id = req.body.id;
  const newPassword = await hashPassword(req.body.newPassword);
  const customer = await Customer.findByPk(id);

  if (!customer) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const updatedCustomerPassword = await Customer.update(
    { password: newPassword },
    { where: { id: id } }
  );

  if (!updatedCustomerPassword) {
    return res.status(404).json({
      status: "fail",
    });
  } else {
    return req.status(200).json({
      status: "success",
      data: {
        updatedCustomerPassword,
      },
    });
  }
};
