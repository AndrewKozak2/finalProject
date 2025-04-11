document.addEventListener('DOMContentLoaded', function() {
    const registrationContainer = document.createElement('div');
    registrationContainer.style.width = '300px';
    registrationContainer.style.margin = '0 auto';
    registrationContainer.style.padding = '20px';
    registrationContainer.style.backgroundColor = '#fff';
    registrationContainer.style.borderRadius = '8px';
    registrationContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    
    const title = document.createElement('h2');
    title.textContent = 'Реєстрація';
    title.style.textAlign = 'center';
    registrationContainer.appendChild(title);

    // Username field
    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.placeholder = "Ім'я користувача";
    usernameInput.style.width = '100%';
    usernameInput.style.padding = '10px';
    usernameInput.style.marginBottom = '10px';
    registrationContainer.appendChild(usernameInput);

    // Password field
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.placeholder = 'Пароль';
    passwordInput.style.width = '100%';
    passwordInput.style.padding = '10px';
    passwordInput.style.marginBottom = '10px';
    registrationContainer.appendChild(passwordInput);

    // Confirm password field
    const confirmPasswordInput = document.createElement('input');
    confirmPasswordInput.type = 'password';
    confirmPasswordInput.placeholder = 'Підтвердити пароль';
    confirmPasswordInput.style.width = '100%';
    confirmPasswordInput.style.padding = '10px';
    confirmPasswordInput.style.marginBottom = '10px';
    registrationContainer.appendChild(confirmPasswordInput);

    // Register button
    const registerButton = document.createElement('button');
    registerButton.textContent = 'Зареєструватися';
    registerButton.style.width = '100%';
    registerButton.style.padding = '10px';
    registerButton.style.backgroundColor = '#4CAF50';
    registerButton.style.color = '#fff';
    registerButton.style.border = 'none';
    registerButton.style.borderRadius = '4px';
    registerButton.style.cursor = 'pointer';
    registrationContainer.appendChild(registerButton);

    // Error message container
    const messageContainer = document.createElement('div');
    messageContainer.style.textAlign = 'center';
    registrationContainer.appendChild(messageContainer);

    // Append the registration form to the body
    document.body.appendChild(registrationContainer);

    // Handle registration form submission
    registerButton.addEventListener('click', async function() {
        const username = usernameInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Check if passwords match
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
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                messageContainer.textContent = 'Реєстрація успішна!';
                messageContainer.style.color = 'green';
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
