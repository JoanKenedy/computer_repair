const { Repair } = require('../models/repair.model');
const { User } = require('../models/user.model');
const { validationResult } = require('express-validator');

const { catchAsync } = require('../utils/catchAsync');

const getAllRepairs = catchAsync(async (req, res) => {
  const repairs = await Repair.findAll({
    where: { status: 'pending' },
    include: [{ model: User }],
  });

  res.status(200).json({
    repairs,
  });
});

const createRepair = catchAsync(async (req, res) => {
  const { userId, date, computerNumber, comments } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(date);
    const messages = errors.array().map((error) => {
      return error.msg;
    });
    const errorMsg = messages.join('. ');
    return res.status(400).json({
      staus: 'error',
      message: errorMsg,
    });
  }

  const newRepair = await Repair.create({
    userId,
    date,
    computerNumber,
    comments,
  });

  res.status(201).json({
    newRepair,
  });
});

const getRepairById = catchAsync(async (req, res) => {
  const { repair } = req;

  res.status(200).json({
    repair,
  });
});

const updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'completed' });

  res.status(200).json({ status: 'success' });
});

const deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;

  await repair.update({ status: 'cancelled' });

  res.status(200).json({ status: 'success' });
});

module.exports = {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
