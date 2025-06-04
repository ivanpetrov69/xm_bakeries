const db = require('./db');

exports.add = async ({ name, price, category, quantity }) => {
  const [result] = await db.execute(
    'INSERT INTO products (name, price, category, quantity) VALUES (?, ?, ?, ?)',
    [name, price, category, quantity]
  );
  return result;
};

exports.search = async ({ minPrice, maxPrice, category, quantity }) => {
  let query = 'SELECT * FROM products WHERE 1=1';
  let params = [];
  if (minPrice) {
    query += ' AND price >= ?';
    params.push(minPrice);
  }
  if (maxPrice) {
    query += ' AND price <= ?';
    params.push(maxPrice);
  }
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  if (quantity) {
    query += ' AND quantity >= ?';
    params.push(quantity);
  }
  const [rows] = await db.execute(query, params);
  return rows;
};