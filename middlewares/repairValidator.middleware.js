const { body } = require('express-validator');

const createRepairValidator = [
  body('date').notEmpty().withMessage('Debes meter una fecha de tu cita'),
  body('computerNumber')
    .notEmpty()
    .withMessage(
      'Para llevar un mejor control , ingresa el numero de serie de la computadora'
    )
    .isNumeric()
    .withMessage('El numero de serie debe der numerico sin letras'),
  body('comments')
    .notEmpty()
    .withMessage(
      'Ingresa datos o información que te sea util para la reparación '
    ),
];

module.exports = { createRepairValidator };
