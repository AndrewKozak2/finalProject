document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.createElement('div');
    loginContainer.style.width = '400px';
    loginContainer.style.margin = '0 auto';
    loginContainer.style.padding = '40px';
    loginContainer.style.backgroundColor = '#fff';
    loginContainer.style.borderRadius = '8px';
    loginContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    loginContainer.style.textAlign = 'center';
    loginContainer.style.fontFamily = 'Arial, sans-serif';

    const title = document.createElement('h2');
    title.textContent = 'Вхід';
    title.style.fontSize = '24px';
    title.style.marginBottom = '20px';
    loginContainer.appendChild(title);

    // Створення форми
    const loginForm = document.createElement('form');
    loginForm.id = 'login-form';

    // Поле для імені користувача
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = "Ім'я користувача";
    usernameInput.style.width = '100%';
    usernameInput.style.padding = '14px';
    usernameInput.style.marginBottom = '15px';
    usernameInput.style.border = '1px solid #ccc';
    usernameInput.style.borderRadius = '8px';
    usernameInput.style.fontSize = '16px';
    usernameInput.style.boxSizing = 'border-box';
    usernameInput.style.transition = 'border-color 0.3s';
    usernameInput.addEventListener('focus', function() {
        usernameInput.style.borderColor = '#4CAF50';
    });
    usernameInput.addEventListener('blur', function() {
        usernameInput.style.borderColor = '#ccc';
    });
    loginForm.appendChild(usernameInput);

    // Поле для паролю
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Пароль';
    passwordInput.style.width = '100%';
    passwordInput.style.padding = '14px';
    passwordInput.style.marginBottom = '25px';
    passwordInput.style.border = '1px solid #ccc';
    passwordInput.style.borderRadius = '8px';
    passwordInput.style.fontSize = '16px';
    passwordInput.style.boxSizing = 'border-box';
    passwordInput.style.transition = 'border-color 0.3s';
    passwordInput.addEventListener('focus', function() {
        passwordInput.style.borderColor = '#4CAF50';
    });
    passwordInput.addEventListener('blur', function() {
        passwordInput.style.borderColor = '#ccc';
    });
    loginForm.appendChild(passwordInput);

    // Кнопка входу
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Увійти';
    loginButton.style.width = '100%';
    loginButton.style.padding = '15px';
    loginButton.style.backgroundColor = '#007BFF';
    loginButton.style.color = '#fff';
    loginButton.style.border = 'none';
    loginButton.style.borderRadius = '8px';
    loginButton.style.cursor = 'pointer';
    loginButton.style.fontSize = '16px';
    loginButton.style.transition = 'background-color 0.3s';
    loginButton.addEventListener('mouseenter', function() {
        loginButton.style.backgroundColor = '#0056b3';
    });
    loginButton.addEventListener('mouseleave', function() {
        loginButton.style.backgroundColor = '#007BFF';
    });
    loginForm.appendChild(loginButton);

    // Контейнер для повідомлень
    const messageContainer = document.createElement('div');
    messageContainer.style.textAlign = 'center';
    loginContainer.appendChild(messageContainer);

    // Додаємо форму в контейнер
    loginContainer.appendChild(loginForm);

    // Додаємо форму на сторінку
    document.body.appendChild(loginContainer);

    // Обробка події форми
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();  // Запобігаємо стандартному відправленню форми

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Перевірка на порожні поля
        if (!username || !password) {
            messageContainer.textContent = 'Будь ласка, заповніть усі поля';
            messageContainer.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                messageContainer.textContent = 'Вхід успішний!';
                messageContainer.style.color = 'green';
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username); // Зберігаємо ім'я користувача в localStorage
                setTimeout(function() {
                    window.location.href = '/index.html'; // Перехід на головну сторінку
                }, 2000);
            } else {
                messageContainer.textContent = data.message;
                messageContainer.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            messageContainer.textContent = 'Сталася помилка, спробуйте пізніше';
            messageContainer.style.color = 'red';
        }
    });
});
