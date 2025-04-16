document.addEventListener('DOMContentLoaded', function () {
    const headerContainer = document.createElement('div');
    headerContainer.classList.add('header-container');

    // 🔹 ЛОГОТИП
    const logo = document.createElement('img');
    logo.src = 'images/logo.png'; // 👈 впевнись, що файл збережено за цим шляхом
    logo.alt = 'TrueScale Logo';
    logo.classList.add('header-logo');
    logo.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });

    const rightContainer = document.createElement('div');
    rightContainer.classList.add('header-right');

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;

        if (role === 'admin') {
            const addProductButton = document.createElement('button');
            addProductButton.textContent = 'Add Product';
            addProductButton.classList.add('header-btn');
            rightContainer.appendChild(addProductButton);

            addProductButton.addEventListener('click', function () {
                if (typeof window.showAddProductForm === 'function') {
                    window.showAddProductForm();
                } else {
                    console.warn('Add product form is not loaded yet');
                }
            });
        }

        const aboutButton = document.createElement('button');
        aboutButton.textContent = 'About Us';
        aboutButton.classList.add('header-btn');
        aboutButton.addEventListener('click', function () {
        window.location.href = '/about.html';
        });
        rightContainer.appendChild(aboutButton);    

        const userLabel = document.createElement('span');
        userLabel.textContent = `${username}`;
        userLabel.classList.add('user-label');

        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Log Out';
        logoutButton.classList.add('header-btn');

        rightContainer.appendChild(userLabel);
        rightContainer.appendChild(logoutButton);

        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            window.location.href = '/index.html';
        });
    } else {
        const registerButton = document.createElement('button');
        registerButton.textContent = 'Register';
        registerButton.classList.add('header-btn');

        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login';
        loginButton.classList.add('header-btn');

        const aboutButton = document.createElement('button');
        aboutButton.textContent = 'About Us';
        aboutButton.classList.add('header-btn');
        aboutButton.addEventListener('click', function () {
        window.location.href = '/about.html';
        });
        rightContainer.appendChild(aboutButton);

        rightContainer.appendChild(registerButton);
        rightContainer.appendChild(loginButton);

        registerButton.addEventListener('click', function () {
            window.location.href = '/registration.html';
        });

        loginButton.addEventListener('click', function () {
            window.location.href = '/login.html';
        });
    }

    // Додаємо логотип зліва, кнопки справа
    headerContainer.appendChild(logo);
    headerContainer.appendChild(rightContainer);
    document.body.insertBefore(headerContainer, document.body.firstChild);
});
