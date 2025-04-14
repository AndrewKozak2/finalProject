const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Product = require('./models/Product');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

app.use(cors());
app.use(express.json());
console.log('Registering auth routes...');
app.use('/api', authRoutes); 
app.use('/api/admin', adminRoutes);

// Підключення до MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/myshop', {
});

// Перевірка з'єднання
mongoose.connection.on('connected', () => {
  console.log(' Connected to MongoDB');
  createAdminUser(); // ⬅️ Створюємо admin після з'єднання
});

// Функція створення admin-користувача, якщо його ще немає
async function createAdminUser() {
  try {
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('Qq+21212121', 10);
      const adminUser = new User({
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
      });
      await adminUser.save();
      console.log(' Admin user created');
    } else {
      console.log(' Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}
// отримання списку товарів
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
