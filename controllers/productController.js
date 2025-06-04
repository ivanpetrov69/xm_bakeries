const Product = require('../models/product');

exports.addProduct = async (req, res, next) => {
  try {
    const result = await Product.add(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.searchProducts = async (req, res, next) => {
  try {
    const result = await Product.search(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
}