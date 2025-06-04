const db = require("../models/db");

exports.generateSalesReport = async () => {
  const [rows] = await db.query(`
    SELECT 
      orders.id AS order_id, 
      customers.name AS customer_name, 
      products.name AS product_name,
      orders.quantity, 
      orders.total_price, 
      orders.created_at 
    FROM orders 
    JOIN customers ON orders.customer_id = customers.id 
    JOIN products ON orders.product_id = products.id 
    ORDER BY orders.created_at DESC
  `);
  return rows;
};
