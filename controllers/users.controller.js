const { User } = require('../models/user.model');
const { validationResult } = require('express-validator');

//Utils

const { catchAsync } = require('../utils/catchAsync');

const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({
    users,
  });
});

const createUser = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((error) => {
      return error.msg;
    });

    const errorMsg = messages.join('. ');
    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  const newUser = await User.create({ name, email, password, role });

  res.status(201).json({ newUser });
});

const getUserById = catchAsync(async (req, res) => {
  const { user } = req;

  res.status(200).json({
    user,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;

  // const user = await User.update({ name, email }, { where: { id: id } });

  await user.update({ name, email });

  res.status(200).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  // Soft delete
  await user.update({ status: 'disable' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
