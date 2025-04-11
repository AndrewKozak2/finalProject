const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const User = require('./models/User');

dotenv.config();
const app = express();
const port = 5000;

// Підключення до MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Реєстрація
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Користувач вже існує' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Реєстрація успішна' });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

// Логін
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Користувача не знайдено' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Невірний пароль' });
        }

        const token = jwt.sign(
            { username: user.username },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`🚀 Сервер працює на http://localhost:${port}`);
});
