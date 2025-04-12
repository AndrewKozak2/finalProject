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
    const registerButton = document.createElement('button');
    registerButton.textContent = 'Реєстрація';
    styleButton(registerButton);
  
    const loginButton = document.createElement('button');
    loginButton.textContent = 'Увійти';
    styleButton(loginButton);
  
 
    const cartIcon = document.createElement('span');
    cartIcon.textContent = '🛒';
    cartIcon.style.fontSize = '24px';
    cartIcon.style.cursor = 'pointer';
  
    rightContainer.appendChild(registerButton);
    rightContainer.appendChild(loginButton);
    rightContainer.appendChild(cartIcon);
  
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
  