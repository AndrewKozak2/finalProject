document.addEventListener('DOMContentLoaded', function () {
    const headerContainer = document.createElement('div');
    headerContainer.style.display = 'flex';
    headerContainer.style.alignItems = 'center';
    headerContainer.style.justifyContent = 'space-between';
    headerContainer.style.padding = '20px 40px';
    headerContainer.style.backgroundColor = '#f5f5f5';
    headerContainer.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';

    const title = document.createElement('h1');
    title.textContent = 'Welcome to TrueScale';
    title.style.margin = '0';
    title.style.fontSize = '28px';
    title.style.flex = '1';
    title.style.textAlign = 'center';
    title.style.color = '#333';

    const rightContainer = document.createElement('div');
    rightContainer.style.display = 'flex';
    rightContainer.style.alignItems = 'center';
    rightContainer.style.gap = '10px';

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const role = payload.role;

      
        if (role === 'admin') {
            const addProductButton = document.createElement('button');
            addProductButton.textContent = 'Add Product';
            styleButton(addProductButton);
            rightContainer.appendChild(addProductButton);

            addProductButton.addEventListener('click', function () {
                if (typeof window.showAddProductForm === 'function') {
                    window.showAddProductForm(); // Викликає функцію з app.js
                } else {
                    console.warn('Форма ще не завантажена');
                }
            });
        }

        const userLabel = document.createElement('span');
        userLabel.textContent = `${username}`;
        userLabel.style.marginRight = '10px';
        userLabel.style.marginLeft = '10px';

        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Log Out';
        styleButton(logoutButton);

        rightContainer.appendChild(userLabel);
        rightContainer.appendChild(logoutButton);

        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('role');
            window.location.href = '/';
        });
    } else {
        const registerButton = document.createElement('button');
        registerButton.textContent = 'Реєстрація';
        styleButton(registerButton);

        const loginButton = document.createElement('button');
        loginButton.textContent = 'Увійти';
        styleButton(loginButton);

        rightContainer.appendChild(registerButton);
        rightContainer.appendChild(loginButton);

        registerButton.addEventListener('click', function () {
            window.location.href = '/registration.html';
        });

        loginButton.addEventListener('click', function () {
            window.location.href = '/login.html';
        });
    }

    headerContainer.appendChild(title);
    headerContainer.appendChild(rightContainer);
    document.body.insertBefore(headerContainer, document.body.firstChild);

    function styleButton(button) {
        button.style.padding = '8px 16px';
        button.style.border = 'none';
        button.style.borderRadius = '6px';
        button.style.backgroundColor = '#007bff';
        button.style.color = '#fff';
        button.style.cursor = 'pointer';
        button.style.fontWeight = 'bold';
        button.style.transition = 'background-color 0.3s ease';
        button.onmouseover = function () {
            button.style.backgroundColor = '#0056b3';
        };
        button.onmouseout = function () {
            button.style.backgroundColor = '#007bff';
        };
    }
});
