import { Request ,Response } from 'express';
import { Model } from 'sequelize';
import { Admin } from "@models/admin";
import { Security } from '@utils/security';
import { IAdmin } from '@interfaces/';

// fetch Admins
export const getAdmins = async (req: Request, res: Response) => {
  const admins: Model<IAdmin>[] = await Admin.findAll();

  res.status(200).json({
    status: "success",
    length: admins.length,
    data: admins
  });
};

// fetch admin by id
export const getAdmin = async (req: Request, res: Response) => {
  const id = req.params.id;
  const admin: Model<IAdmin> = await Admin.findByPk(id);

  if (!admin) {
    return res.status(404).json({
      status: "fail",
    });
  }

  res.status(200).json({
    status: "success",
    data: admin
  });
  
};

// Add new admin
export const addAdmin = async (req: Request, res: Response) => {
  try {
    const { email, name, password, role } = req.body;
    let cryptedPwd = await Security.hashPassword(password);
    const admin: Model<IAdmin> = await Admin.create({
      email: email,
      name: name,
      password: cryptedPwd,
      role: role,
    });
  
    if (!admin) {
      return res.status(500).json({
        status: "fail",
      });
    } 
    
    res.status(200).json({
      status: "success",
      data: admin
    });
    
  } catch (err) {
    console.log(err.message);
  }
  
};

//delete admin
export const deleteAdmin = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const admin = await Admin.destroy({
    where: { id: id },
  });

  res.status(200).json({
    status: "success",
    data: admin
  });
};

// update admin
export const updateAdmin = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const admin: Model<IAdmin> = await Admin.findByPk(id);
  if (!admin) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const { email, name, role } = req.body;

  const updatedAdmin = await Admin.update(
    {
      email: email,
      name: name,
      role: role,
    },
    { where: { id: id } }
  );

  if (!updatedAdmin) {
    return res.status(404).json({
      status: "fail",
    });
  }

  res.status(200).json({
    status: "success",
    data: updatedAdmin
  });
};
