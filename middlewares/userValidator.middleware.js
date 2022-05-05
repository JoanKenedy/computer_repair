const { body } = require('express-validator');

const createUserValidator = [
  body('name').notEmpty().withMessage('El campo nombre debe ser llenado '),
  body('email')
    .notEmpty()
    .withMessage('Debes llenar el campo email')
    .isEmail()
    .withMessage('Debes ingresar un correo valido'),
  body('password')
    .notEmpty()
    .withMessage('Es necesario ingresar ua contraseña para tu seguridad')
    .isLength({ min: 7 })
    .withMessage('Para tu contraseña , debe ser minimo 7 caracteres'),
];

module.exports = { createUserValidator };
