const { Repair } = require('../models/repair.model');

const getAllRepairs = async (req, res) => {
  const repairs = await Repair.findAll();
  res.status(200).json({
    repairs,
  });
};

const createRepair = async (req, res) => {
  const { date, userId } = req.body;
  const newRepair = await Repair.create({ date, userId });
  res.status(201).json({
    newRepair,
  });
};

const getRepairById = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({ where: { id } });

    if (repair.status !== 'pending') {
      return res.status(404).json({
        status: 'error',
        message: 'the computer is no longer pending',
      });
    }

    res.status(200).json({
      repair,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // const user = await User.update({ name, email }, { where: { id: id } });
    const repair = await Repair.findOne({ where: { id } });

    if (repair.status !== 'pending') {
      return res.status(404).json({
        status: 'error',
        message: 'the computer is no longer pending',
      });
    }
    await repair.update({ status: 'completed' });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({ where: { id } });

    if (repair.status !== 'pending') {
      return res.status(404).json({
        status: 'error',
        message: 'the computer is no longer pending',
      });
    }
    // Soft delete
    await repair.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
