🏁 TrueScale — Онлайн-магазин масштабних моделей авто

🔧 Основний функціонал

Головна сторінка:

Сучасний дизайн у темній темі.
Hero-секція з кнопками переходу.
Інтерактивний слайдер брендів, реалізований через Swiper.js.
Секція новинок, яка відображає останні додані товари з бази даних (MongoDB Atlas).

Фільтрація товарів:

За брендом, масштабом і ціною.
Динамічне завантаження даних з бекенду через API.

Кошик:

Додавання товарів у кошик.
Відображення кількості, ціни та загальної суми.
Дані зберігаються у localStorage, тому не зникають при оновленні сторінки.

Реєстрація та логін:

Захищена автентифікація з хешуванням паролів через bcryptjs.
Авторизація через JWT-токени, які зберігаються в localStorage.
Роль користувача зберігається в базі даних та передається в токені.

Ролі користувачів:
Звичайні користувачі мають доступ лише до перегляду товарів.
Адміністратор може додавати нові товари через модальну форму, що відкривається після входу.

🧪 Технології

Front-End:
HTML5, CSS3, JavaScript (ES6+)
Swiper.js (для слайдера)
LocalStorage (збереження стану)

Back-End:
Node.js + Express
MongoDB Atlas
JWT (авторизація)
bcryptjs (захист паролів)
Middleware для перевірки ролі

☁️ Деплоймент
Frontend: GitHub Pages
Backend: Render

📸 Скринкаст
Проєкт презентується у вигляді відеозапису з демонстрацією функціоналу, розповіддю про технології, а також поясненням архітектури додатку.

🔗 GitHub репозиторій: https://github.com/AndrewKozak2/finalProject

