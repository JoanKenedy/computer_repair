const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

//Middlewares

const { repairExists } = require('../middlewares/repairs.middlewares');
const {
  createRepairValidator,
} = require('../middlewares/repairValidator.middleware');

const {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

router.get('/', getAllRepairs);

router.post('/', createRepairValidator, createRepair);

router.get('/:id', repairExists, getRepairById);

router.patch('/:id', repairExists, updateRepair);

router.delete('/:id', repairExists, deleteRepair);

module.exports = { repairsRouter: router };
