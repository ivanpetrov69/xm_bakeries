const express = require('express');
const router = express.Router();
const { addProduct, searchProducts } = require('../controllers/productController');
const validateInput = require('../middleware/validateInput');

router.post('/', validateInput, addProduct);
router.get('/search', searchProducts);

module.exports = router;