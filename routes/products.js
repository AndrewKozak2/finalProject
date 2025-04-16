const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Отримання всіх моделей без пагінації
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // ⬅ отримуємо всі товари
    res.json(products); // ⬅ відправляємо масив напряму, без { products }
  } catch (error) {
    res.status(500).json({ error: 'Не вдалося отримати товари' });
  }
});

module.exports = router;
