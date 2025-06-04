const db = require("../models/db");

exports.getInventoryStatus = async () => {
  const [rows] = await db.query("SELECT name, quantity FROM products");
  return rows;
};
