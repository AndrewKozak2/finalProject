document.addEventListener('DOMContentLoaded', function () {
    const registrationContainer = document.createElement('div');
    registrationContainer.classList.add('auth-container');

    const title = document.createElement('h2');
    title.textContent = 'Register';
    title.classList.add('auth-title');
    registrationContainer.appendChild(title);

    const registrationForm = document.createElement('form');
    registrationForm.id = 'registration-form';

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = "Username";
    usernameInput.classList.add('auth-input');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = "Your email";
    emailInput.classList.add('auth-input');

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.classList.add('auth-input');

    const confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.type = 'password';
    confirmPasswordInput.placeholder = 'Confirm password';
    confirmPasswordInput.classList.add('auth-input');

    const registerButton = document.createElement('button');
    registerButton.textContent = 'Register';
    registerButton.classList.add('auth-button');

    registrationForm.appendChild(usernameInput);
    registrationForm.appendChild(emailInput);
    registrationForm.appendChild(passwordInput);
    registrationForm.appendChild(confirmPasswordInput);
    registrationForm.appendChild(registerButton);

    const messageContainer = document.createElement('div');
    messageContainer.classList.add('auth-message');

    registrationContainer.appendChild(registrationForm);
    registrationContainer.appendChild(messageContainer);
    document.body.appendChild(registrationContainer);

    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!username || !email || !password || !confirmPassword) {
            messageContainer.textContent = 'Please fill in all fields';
            messageContainer.style.color = 'red';
            return;
        }

        if (password !== confirmPassword) {
            messageContainer.textContent = 'Passwords do not match';
            messageContainer.style.color = 'red';
            return;
        }

        try {
            const response = await fetch('https://truescale-backend.onrender.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                messageContainer.textContent = 'Registration successful!';
                messageContainer.style.color = 'green';
                localStorage.setItem('username', username);
                setTimeout(function () {
                    window.location.href = '/login.html';
                }, 2000);
            } else {
                messageContainer.textContent = data.message || 'Registration error';
                messageContainer.style.color = 'red';
            }
        } catch (error) {
            console.error('Error:', error);
            messageContainer.textContent = 'Something went wrong. Please try again later.';
            messageContainer.style.color = 'red';
        }
    });
});
