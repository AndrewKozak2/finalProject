const cartButton = document.querySelector('.js-cart-btn');
const cartSidebar = document.createElement('div');

cartSidebar.style.position = 'fixed';
cartSidebar.style.top = '0';
cartSidebar.style.right = '-400px';
cartSidebar.style.width = '400px';
cartSidebar.style.height = '100vh';
cartSidebar.style.backgroundColor = '#fff';
cartSidebar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
cartSidebar.style.padding = '20px';
cartSidebar.style.overflowY = 'auto';
cartSidebar.style.transition = 'right 0.3s ease-in-out, opacity 0.3s ease-in-out';
cartSidebar.style.fontFamily = 'Arial, sans-serif';
cartSidebar.style.color = '#333';
cartSidebar.style.borderRadius = '10px';
document.body.appendChild(cartSidebar);

const closeButton = document.createElement('button');
closeButton.textContent = '✖';
closeButton.style.position = 'absolute';
closeButton.style.top = '10px';
closeButton.style.right = '10px';
closeButton.style.border = 'none';
closeButton.style.background = 'transparent';
closeButton.style.fontSize = '24px';
closeButton.style.cursor = 'pointer';
closeButton.style.color = '#333';

let cart = [];
let products = [];

cartButton.addEventListener('click', function () {
    cartSidebar.style.right = cartSidebar.style.right === '0px' ? '-400px' : '0px';
    renderCart();
});

closeButton.addEventListener('click', function () {
    cartSidebar.style.right = '-400px';
});

fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        console.log('Products loaded:', products);
    })
    .catch(error => console.error('Error loading products:', error));

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

function renderCart() {
    cartSidebar.innerHTML = '<h2 style="text-align: center;">Корзина</h2>';
    cartSidebar.appendChild(closeButton);
    let total = 0;

    if (cart.length === 0) {
        cartSidebar.innerHTML += '<p style="text-align: center; font-size: 18px; margin-top: 20px;">Корзина пуста</p>';
        cartSidebar.appendChild(closeButton);
        return;
    }

    cart.forEach(item => {
        total += item.quantity * item.price;
        cartSidebar.innerHTML += `
            <div style='display: flex; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #ccc; padding-bottom: 10px; border-radius: 8px; background-color: #fafafa; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);'>
                <img src='${item.image}' alt='${item.name}' style='width: 60px; height: 60px; object-fit: cover; margin-right: 10px; border-radius: 8px;'>
                <div style='flex: 1;'>
                    <h4 style='margin: 0; font-size: 18px;'>${item.name}</h4>
                    <p style='margin: 5px 0; color: #555;'>Бренд: ${item.brand}</p>
                    <p style='margin: 5px 0; color: #555;'>Масштаб: ${item.scale}</p>
                    <p style='margin: 5px 0; font-weight: bold;'>Ціна: $${item.price}</p>
                    <input type='number' min='1' value='${item.quantity}' style='width: 50px; padding: 5px; margin-top: 5px; border-radius: 5px; border: 1px solid #ddd;' onchange='updateQuantity(${item.id}, this.value)' />
                    <button onclick='removeFromCart(${item.id})' style='margin-left: 10px; background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 5px; transition: background-color 0.2s;'>Видалити</button>
                </div>
            </div>
        `;
    });

    cartSidebar.innerHTML += `<h3 style='text-align: center; margin-top: 20px;'>Загальна сума: $${total}</h3>`;

    const orderButton = document.createElement('button');
    orderButton.textContent = 'Замовити';
    orderButton.style.marginTop = '20px';
    orderButton.style.padding = '10px 20px';
    orderButton.style.backgroundColor = '#4CAF50';
    orderButton.style.color = 'white';
    orderButton.style.border = 'none';
    orderButton.style.cursor = 'pointer';
    orderButton.style.borderRadius = '5px';
    orderButton.addEventListener('click', function () {
        alert('Ваше замовлення прийнято!');
        cart = [];
        renderCart();
    });

    cartSidebar.appendChild(orderButton);
    cartSidebar.appendChild(closeButton);
}

function updateQuantity(id, quantity) {
    const item = cart.find(item => item.id === id);
    if (item && quantity > 0) {
        item.quantity = parseInt(quantity, 10);
        renderCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}
