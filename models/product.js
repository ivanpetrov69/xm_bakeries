const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = {
  // Add a new product
  add: async ({ name, price, category, quantity }) => {
    const product = new Product({ name, price, category, quantity });
    return await product.save();
  },

  // Search for products with filters
  search: async ({ minPrice, maxPrice, category, quantity }) => {
    const query = {};

    if (minPrice !== undefined) query.price = { ...query.price, $gte: minPrice };
    if (maxPrice !== undefined) query.price = { ...query.price, $lte: maxPrice };
    if (category) query.category = category;
    if (quantity !== undefined) query.quantity = { $gte: quantity };

    return await Product.find(query);
  }
};
