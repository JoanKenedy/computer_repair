const express = require('express');

const router = express.Router();

const {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

router.get('/', getAllRepairs);

router.post('/', createRepair);

router.get('/:id', getRepairById);

router.patch('/:id', updateRepair);

router.delete('/:id', deleteRepair);

module.exports = { repairsRouter: router };
