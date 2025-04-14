const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// 📌 Реєстрація
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Перевірка на заповненість
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Будь ласка, заповніть усі поля' });
    }

    // Перевірка чи користувач існує
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з такою поштою вже існує' });
    }

    // Хешування пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Створення користувача
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();
    res.status(201).json({ message: 'Користувач зареєстрований успішно' });
  } catch (error) {
    console.error('Помилка при реєстрації:', error);
    res.status(500).json({ message: 'Помилка сервера. Спробуйте пізніше.' });
  }
});

// 📌 Логін
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Будь ласка, введіть email і пароль' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Неправильний email або пароль' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Неправильний email або пароль' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    console.error('Помилка при логіні:', error);
    res.status(500).json({ message: 'Помилка сервера. Спробуйте пізніше.' });
  }
});

module.exports = router;
