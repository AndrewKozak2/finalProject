const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Отримання моделей з пагінацією
router.get('/products', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  try {
    const products = await Product.find().skip(skip).limit(limit);
    const total = await Product.countDocuments();

    res.json({ products, total });
  } catch (error) {
    res.status(500).json({ error: 'Не вдалося отримати товари' });
  }
});

module.exports = router;
