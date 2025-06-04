const Report = require('../models/report');

exports.getSalesReport = async (req, res, next) => {
  try {
    const result = await Report.sales();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getInventoryReport = async (req, res, next) => {
  try {
    const result = await Report.inventory();
    res.json(result);
  } catch (err) {
    next(err);
  }
};