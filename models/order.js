const db = require('./db');

exports.place = async ({ customer_id, product_id, quantity }) => {
  const [result] = await db.execute(
    'INSERT INTO orders (customer_id, product_id, quantity) VALUES (?, ?, ?)',
    [customer_id, product_id, quantity]
  );
  return result;
};

exports.getAll = async () => {
  const [rows] = await db.execute('SELECT * FROM orders');
  return rows;
};
