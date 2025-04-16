// middlewares/auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// 🔐 Перевірка чи користувач — адміністратор
function verifyAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Немає токена або неправильний формат' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Доступ дозволено лише адміністраторам' });
    }

    req.user = decoded; // додаємо інфо про користувача в запит
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Недійсний або прострочений токен' });
  }
}

module.exports = { verifyAdmin };
