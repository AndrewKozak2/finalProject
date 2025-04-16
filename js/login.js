window.addEventListener('load', function () {
    const loginContainer = document.createElement('div');
    loginContainer.classList.add('auth-container');

    const title = document.createElement('h2');
    title.textContent = 'Login';
    title.classList.add('auth-title');
    loginContainer.appendChild(title);

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = "Your email";
    emailInput.classList.add('auth-input', 'email-input');

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.classList.add('auth-input', 'password-input');

    const loginForm = document.createElement('form');
    loginForm.id = 'login-form';
    loginForm.appendChild(emailInput);
    loginForm.appendChild(passwordInput);

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    loginButton.classList.add('auth-button');
    loginForm.appendChild(loginButton);

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('auth-message');

    loginContainer.appendChild(loginForm);
    loginContainer.appendChild(messageContainer);
    document.body.appendChild(loginContainer);

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !password) {
            messageContainer.textContent = 'Please fill in all fields';
            messageContainer.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('https://truescale-backend.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                messageContainer.textContent = 'Login successful!';
                messageContainer.style.color = 'green';
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('role', data.role);
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 2000);
            } else {
                messageContainer.textContent = data.message || 'Login error';
                messageContainer.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            messageContainer.textContent = 'Something went wrong. Please try again later.';
            messageContainer.style.color = 'red';
        }
    });
});
