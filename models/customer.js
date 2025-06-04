const db = require('./db');

// Used during registration
exports.add = async ({ name, email, phone, password }) => {
  const [result] = await db.execute(
    'INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)',
    [name, email, phone, password]
  );
  return result;
};

// Get all customers (used for admin viewing)
exports.getAll = async () => {
  const [rows] = await db.execute('SELECT id, name, email, phone FROM customers');
  return rows;
};

// Used in login to find user by email
exports.findByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT * FROM customers WHERE email = ?',
    [email]
  );
  return rows[0]; // return single user
};
