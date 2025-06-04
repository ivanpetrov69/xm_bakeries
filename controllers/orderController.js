const Order = require('../models/order');

exports.placeOrder = async (req, res, next) => {
  try {
    const result = await Order.place(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const result = await Order.getAll();
    res.json(result);
  } catch (err) {
    next(err);
  }
};