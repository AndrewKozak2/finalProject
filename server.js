const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/User');
const Product = require('./models/Product'); // ✅ Додано

const app = express();
const port = 5000;

dotenv.config();

// Підключення до MongoDB
mongoose.connect('mongodb://localhost:27017/myshop', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error: ', err));

// Мідлвари
app.use(bodyParser.json());
app.use(cors());

// Налаштовуємо Express на обробку статичних файлів з папки 'js'
app.use('/js', express.static(path.join(__dirname, 'js')));

// 📦 Отримати всі товари
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Помилка при отриманні товарів' });
  }
});

// ➕ Додати новий товар (для адміністратора)
app.post('/api/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Товар створено' });
  } catch (err) {
    res.status(500).json({ message: 'Помилка при створенні товару' });
  }
});

// Маршрут для реєстрації користувача
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
});

// Маршрут для входу
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// Маршрут за замовчуванням для доступу до головної сторінки
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Обробка невідомих запитів
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
