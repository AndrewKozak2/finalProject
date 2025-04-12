const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./models/User'); // Імпорт моделі User

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
app.use(express.static(path.join(__dirname)));

// Маршрут для реєстрації користувача
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Перевірка наявності користувача
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Хешування пароля
  const hashedPassword = await bcrypt.hash(password, 10);

  // Створення нового користувача
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User registered successfully' });
});

// Маршрут для входу
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Знайти користувача в базі
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Перевірка пароля
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Створення JWT токену
  const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });

  res.json({ token });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
