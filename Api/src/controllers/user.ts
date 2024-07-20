import { Request ,Response } from 'express';
import { User } from "@models/user";
import { Security } from '@utils/security';

const security = new Security();

// fetch Users
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.status(200).json({
    status: "success",
    length: users.length,
    data: {
      users,
    },
  });
};

// fetch user by id
export const getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      status: "fail",
    });
  } else {
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
};

// Add new user
export const addUser = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  const password = await security.hashPassword(req.body.password);
  const user = User.create({
    email: email,
    name: name,
    phone: phone,
    address: address,
    password: password,
  });

  if (user) {
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } else {
    return res.status(500).json({
      status: "fail",
    });
  }
};

//delete user
export const deleteUser = async (req, res) => {
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
    data: {
      user,
    },
  });
};

// update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: "fail",
    });
  }

  const email = req.body.email;
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;

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
    return req.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } else {
    return res.status(404).json({
      status: "fail",
    });
  }
};

// update user password
export const updateUserPassword = async (req, res) => {
  const id = req.body.id;
  const newPassword = await security.hashPassword(req.body.newPassword);
  const user = await User.findByPk(id);

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
  } else {
    return req.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
};
