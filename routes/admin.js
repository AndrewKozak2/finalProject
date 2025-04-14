const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

// Middleware для перевірки прав адміністратора
function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Немає токена' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.username !== 'admin') {
      return res.status(403).json({ message: 'Доступ заборонено' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Недійсний токен' });
  }
}

// Додавання нового товару (тільки для admin)
router.post('/products', verifyAdmin, async (req, res) => {
  try {
    const { name, brand, price, scale, image, inStock } = req.body;

    const newProduct = new Product({
      name,
      brand,
      price,
      scale,
      image,
      inStock
    });

    await newProduct.save();
    res.status(201).json({ message: 'Товар додано успішно', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при додаванні товару', error });
  }
});

// Редагування товару (тільки для admin)
router.put('/products/:id', verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }

    res.json({ message: 'Товар оновлено', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при оновленні товару', error });
  }
});

module.exports = router;
