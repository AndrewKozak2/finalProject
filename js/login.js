document.addEventListener('DOMContentLoaded', function () {
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

    // Поле для email
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
    emailInput.addEventListener('focus', function () {
        emailInput.style.borderColor = '#4CAF50';
    });
    emailInput.addEventListener('blur', function () {
        emailInput.style.borderColor = '#ccc';
    });

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
    passwordInput.addEventListener('focus', function () {
        passwordInput.style.borderColor = '#4CAF50';
    });
    passwordInput.addEventListener('blur', function () {
        passwordInput.style.borderColor = '#ccc';
    });

    const loginForm = document.createElement('form');
    loginForm.id = 'login-form';
    loginForm.appendChild(emailInput);
    loginForm.appendChild(passwordInput);

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
    loginButton.addEventListener('mouseenter', function () {
        loginButton.style.backgroundColor = '#0056b3';
    });
    loginButton.addEventListener('mouseleave', function () {
        loginButton.style.backgroundColor = '#007BFF';
    });
    loginForm.appendChild(loginButton);

    const messageContainer = document.createElement('div');
    messageContainer.style.textAlign = 'center';
    messageContainer.style.marginTop = '15px';
    loginContainer.appendChild(loginForm);
    loginContainer.appendChild(messageContainer);

    document.body.appendChild(loginContainer);

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            messageContainer.textContent = 'Будь ласка, заповніть усі поля';
            messageContainer.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                messageContainer.textContent = 'Вхід успішний!';
                messageContainer.style.color = 'green';
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('role', data.role);

                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 2000);
            } else {
                messageContainer.textContent = data.message || 'Помилка входу';
                messageContainer.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            messageContainer.textContent = 'Сталася помилка, спробуйте пізніше';
            messageContainer.style.color = 'red';
        }
    });
});
