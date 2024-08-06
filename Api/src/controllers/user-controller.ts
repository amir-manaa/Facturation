import { Request ,Response } from 'express';
import { Model } from 'sequelize';
import { User } from "@models/user";
import { Security } from '@utils/security';
import { IUser } from '@interfaces/';

const security = new Security();

// fetch Users
export const getUsers = async (req: Request, res: Response) => {
  const users: Model<IUser>[] = await User.findAll();
  res.status(200).json({
    status: "success",
    length: users.length,
    data: users
  });
};

// fetch user by id
export const getUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user: Model<IUser> = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
    });
  } else {
    return res.status(200).json({
      status: "success",
      data: user
    });
  }
};

// Add new user
export const addUser = async (req: Request, res: Response) => {
  
  const { email, name, phone, address, password } = req.body;
  let cryptedPwd = await security.hashPassword(password);

  const user: Promise<Model<IUser>> = User.create({
    email: email,
    name: name,
    phone: phone,
    address: address,
    password: cryptedPwd,
  });

  if (user) {
    return res.status(200).json({
      status: "success",
      data: user
    });
  }

  res.status(500).json({
    status: "fail",
  });
};

//delete user
export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const user = await User.destroy({
    where: {
      id: id,
    },
  });

  res.status(200).json({
    status: "success",
    data: user
  });
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const user: Model<IUser> = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const { email, name, phone, address } = req.body;
  const updatedUser = await User.update(
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

  if (updatedUser) {
    return res.status(200).json({
      status: "success",
      data: user
    });
  } 

  res.status(404).json({
    status: "fail",
  });
};

// update user password
export const updateUserPassword = async (req: Request, res: Response) => {
  const id = req.body.id;
  const newPassword = await security.hashPassword(req.body.newPassword);
  const user: Model<IUser> = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const updatedUserPassword = await User.update(
    { password: newPassword },
    { where: { id: id } }
  );

  if (!updatedUserPassword) {
    return res.status(404).json({
      status: "fail",
    });
  }

  res.status(200).json({
    status: "success",
    data: user
  });
};
