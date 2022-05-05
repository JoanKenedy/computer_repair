const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

//Middlewares

const { userExists } = require('../middlewares/users.middlewares');
const {
  createUserValidator,
} = require('../middlewares/userValidator.middleware');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

router.get('/', getAllUsers);

router.post('/', createUserValidator, createUser);

router.get('/:id', userExists, getUserById);

router.patch('/:id', userExists, updateUser);

router.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter: router };
