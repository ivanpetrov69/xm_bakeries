const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = {
  // Used during registration
  add: async ({ name, email, phone, password }) => {
    const newCustomer = new Customer({ name, email, phone, password });
    return await newCustomer.save(); // Returns the created document
  },

  // Get all customers (used for admin viewing)
  getAll: async () => {
    return await Customer.find({}, 'id name email phone'); // Returns only these fields
  },

  // Used in login to find user by email
  findByEmail: async (email) => {
    return await Customer.findOne({ email }); // Returns a single document
  }
};
