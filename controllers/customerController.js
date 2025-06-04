const Customer = require('../models/customer');

exports.addCustomer = async (req, res, next) => {
  try {
    const result = await Customer.add(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.getAll();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};