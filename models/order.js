const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, { timestamps: true });  // optional: adds createdAt, updatedAt fields

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  // Place a new order
  place: async ({ customer_id, product_id, quantity }) => {
    const order = new Order({ customer_id, product_id, quantity });
    return await order.save();
  },

  // Get all orders
  getAll: async () => {
    // Populate references to get detailed customer and product info
    return await Order.find()
      .populate('customer_id', 'name email phone')   // select fields to return from customer
      .populate('product_id', 'name price category quantity') // select fields to return from product
      .exec();
  }
};
