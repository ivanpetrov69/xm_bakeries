const Customer = require("../models/customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, email, phone, password } = req.body; // <-- include phone here
  try {
    const existingCustomer = await Customer.findByEmail(email);
    if (existingCustomer) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Pass phone here as well!
    const newCustomer = await Customer.add({ name, email, phone, password: hashedPassword });

    res.status(201).json({ message: "Customer registered successfully", customerId: newCustomer._id });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await Customer.findByEmail(email);

    if (!customer) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Sign JWT token
    const token = jwt.sign({ id: customer._id, name: customer.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};
