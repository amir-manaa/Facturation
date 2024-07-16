import { Admin } from "../models/admin";
import { Request ,Response } from 'express';
import { hashPassword } from '../utils/helpers';

// fetch Admins
export const getAdmins = async (req: Request, res: Response) => {
  const admins = await Admin.findAll();
  res.status(200).json({
    status: "success",
    length: admins.length,
    data: {
      admins,
    },
  });
};

// fetch admin by id
export const getAdmin = async (req, res) => {
  const id = req.params.id;
  const admin = await Admin.findByPk(id);

  if (!admin) {
    return res.status(404).json({
      status: "fail",
    });
  } else {
    return res.status(200).json({
      status: "success",
      data: {
        admin,
      },
    });
  }
};

// Add new admin
export const addAdmin = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const role = req.body.role;
  const admin = Admin.create({
    email: email,
    name: name,
    password: await hashPassword(password),
    role: role,
  });

  if (admin) {
    return res.status(200).json({
      status: "success",
      data: {
        admin,
      },
    });
  } else {
    return res.status(500).json({
      status: "fail",
    });
  }
};

//delete admin
export const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const admin = await Admin.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    status: "success",
    data: {
      admin,
    },
  });
};

// update admin
export const updateAdmin = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const admin = await Admin.findByPk(id);
  if (!admin) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const email = req.body.email;
  const name = req.body.name;
  const role = req.body.role;

  const updatedAdmin = await Admin.update(
    {
      email: email,
      name: name,
      role: role,
    },
    {
      where: { id: id },
    }
  );

  if (updatedAdmin) {
    return req.status(200).json({
      status: "success",
      data: {
        updatedAdmin,
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
    });
  }
};
