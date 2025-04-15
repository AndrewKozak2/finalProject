const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/myshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log(' Підключено до MongoDB');
  importData();
}).catch(err => {
  console.error(' Помилка підключення:', err);
});

async function importData() {
  try {
    const filePath = path.join(__dirname, 'data', 'products.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(jsonData);

    await Product.deleteMany();
    await Product.insertMany(products); 

    console.log(' Дані імпортовано успішно');
    process.exit();
  } catch (err) {
    console.error('Помилка імпорту:', err);
    process.exit(1);
  }
}
