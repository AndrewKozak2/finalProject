document.addEventListener('DOMContentLoaded', function() {
    const registrationContainer = document.createElement('div');
    registrationContainer.style.width = '400px';
    registrationContainer.style.margin = '0 auto';
    registrationContainer.style.padding = '40px';
    registrationContainer.style.backgroundColor = '#fff';
    registrationContainer.style.borderRadius = '8px';
    registrationContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    registrationContainer.style.textAlign = 'center';
    registrationContainer.style.fontFamily = 'Arial, sans-serif';

    const title = document.createElement('h2');
    title.textContent = 'Реєстрація';
    title.style.fontSize = '24px';
    title.style.marginBottom = '20px';
    registrationContainer.appendChild(title);

    // Створення форми
    const registrationForm = document.createElement('form');
    registrationForm.id = 'registration-form';

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
    registrationForm.appendChild(usernameInput);

    // Поле для пошти
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = "Ваша пошта";
    emailInput.style.width = '100%';
    emailInput.style.padding = '14px';
    emailInput.style.marginBottom = '15px';
    emailInput.style.border = '1px solid #ccc';
    emailInput.style.borderRadius = '8px';
    emailInput.style.fontSize = '16px';
    emailInput.style.boxSizing = 'border-box';
    emailInput.style.transition = 'border-color 0.3s';
    emailInput.addEventListener('focus', function() {
        emailInput.style.borderColor = '#4CAF50';
    });
    emailInput.addEventListener('blur', function() {
        emailInput.style.borderColor = '#ccc';
    });
    registrationForm.appendChild(emailInput);

    // Поле для паролю
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Пароль';
    passwordInput.style.width = '100%';
    passwordInput.style.padding = '14px';
    passwordInput.style.marginBottom = '15px';
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
    registrationForm.appendChild(passwordInput);

    // Поле для підтвердження паролю
    const confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.type = 'password';
    confirmPasswordInput.placeholder = 'Підтвердити пароль';
    confirmPasswordInput.style.width = '100%';
    confirmPasswordInput.style.padding = '14px';
    confirmPasswordInput.style.marginBottom = '25px';
    confirmPasswordInput.style.border = '1px solid #ccc';
    confirmPasswordInput.style.borderRadius = '8px';
    confirmPasswordInput.style.fontSize = '16px';
    confirmPasswordInput.style.boxSizing = 'border-box';
    confirmPasswordInput.style.transition = 'border-color 0.3s';
    confirmPasswordInput.addEventListener('focus', function() {
        confirmPasswordInput.style.borderColor = '#4CAF50';
    });
    confirmPasswordInput.addEventListener('blur', function() {
        confirmPasswordInput.style.borderColor = '#ccc';
    });
    registrationForm.appendChild(confirmPasswordInput);

    // Кнопка реєстрації
    const registerButton = document.createElement('button');
    registerButton.textContent = 'Зареєструватися';
    registerButton.style.width = '100%';
    registerButton.style.padding = '15px';
    registerButton.style.backgroundColor = '#007BFF'; // Синій колір
    registerButton.style.color = '#fff';
    registerButton.style.border = 'none';
    registerButton.style.borderRadius = '8px';
    registerButton.style.cursor = 'pointer';
    registerButton.style.fontSize = '16px';
    registerButton.style.transition = 'background-color 0.3s';
    registerButton.addEventListener('mouseenter', function() {
        registerButton.style.backgroundColor = '#0056b3'; // Темно-синій при наведенні
    });
    registerButton.addEventListener('mouseleave', function() {
        registerButton.style.backgroundColor = '#007BFF'; // Відновлюється синій колір
    });
    registrationForm.appendChild(registerButton);

    // Контейнер для повідомлень
    const messageContainer = document.createElement('div');
    messageContainer.style.textAlign = 'center';
    registrationContainer.appendChild(messageContainer);

    // Додаємо форму в контейнер
    registrationContainer.appendChild(registrationForm);

    // Додаємо форму на сторінку
    document.body.appendChild(registrationContainer);

    // Обробка події форми
    registrationForm.addEventListener('submit', async function(event) {
        event.preventDefault();  // Запобігаємо стандартному відправленню форми

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Перевірка на порожні поля
        if (!username || !email || !password || !confirmPassword) {
            messageContainer.textContent = 'Будь ласка, заповніть усі поля';
            messageContainer.style.color = 'red';
            return;
        }

        // Перевірка на співпадіння паролів
        if (password !== confirmPassword) {
            messageContainer.textContent = 'Паролі не співпадають';
            messageContainer.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                messageContainer.textContent = 'Реєстрація успішна!';
                messageContainer.style.color = 'green';
                localStorage.setItem('username', username); // Зберігаємо ім'я користувача в localStorage
                setTimeout(function() {
                    window.location.href = '/login.html'; // Перехід на сторінку входу
                }, 2000);
            } else {
                messageContainer.textContent = data.message || 'Помилка реєстрації';
                messageContainer.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            messageContainer.textContent = 'Сталася помилка, спробуйте пізніше';
            messageContainer.style.color = 'red';
        }
    });
});
