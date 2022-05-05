const { Repair } = require('../models/repair.model');

const repairExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({ where: { id, status: 'pending' } });

    if (!repair) {
      return res.status(404).json({
        status: 'error',
        message: 'Cannnot update repair because it does not exists',
      });
    }

    // Add user data to the req object
    req.repair = repair;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { repairExists };
