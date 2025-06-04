const db = require('./db');

exports.sales = async () => {
  const [rows] = await db.execute(
    'SELECT o.id, c.name AS customer, p.name AS product, o.quantity, (o.quantity * p.price) AS total FROM orders o JOIN customers c ON o.customer_id = c.id JOIN products p ON o.product_id = p.id'
  );
  return rows;
};

exports.inventory = async () => {
  const [rows] = await db.execute('SELECT name, category, quantity FROM products');
  return rows;
};
