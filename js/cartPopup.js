document.addEventListener('DOMContentLoaded', function () {
    window.cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartButton = document.createElement('img');
    cartButton.src = 'images/cart.png';
    cartButton.alt = 'Cart';
    cartButton.classList.add('cart-icon-img');

    // Wait for .header-right and append the cart button there
    function waitForElement(selector, callback) {
        const check = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(check);
                callback(element);
            }
        }, 100);
    }

    waitForElement('.header-right', function (rightContainer) {
        rightContainer.appendChild(cartButton);
    });

    const cartSidebar = document.createElement('div');
    cartSidebar.classList.add('cart-sidebar');
    document.body.appendChild(cartSidebar);

    const closeButton = document.createElement('button');
    closeButton.textContent = '✖';
    closeButton.classList.add('close-cart-btn');

    cartButton.addEventListener('click', function () {
        cartSidebar.style.right = cartSidebar.style.right === '0px' ? '-400px' : '0px';
        renderCart();
    });

    closeButton.addEventListener('click', function () {
        cartSidebar.style.right = '-400px';
    });

    window.renderCart = function () {
        cartSidebar.innerHTML = '<h2 class="cart-title">Shopping Cart</h2>';
        let total = 0;

        if (cart.length === 0) {
            cartSidebar.innerHTML += '<p class="cart-empty">Your cart is empty</p>';
            cartSidebar.appendChild(closeButton);
            return;
        }

        cart.forEach(item => {
            total += item.quantity * item.price;
            cartSidebar.innerHTML += `
                <div class="cart-item">
                    <img src='${item.image}' alt='${item.name}' class="cart-item-img">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Brand: ${item.brand}</p>
                        <p>Scale: ${item.scale}</p>
                        <p><strong>Price: $${item.price}</strong></p>
                        <input type='number' min='1' value='${item.quantity}' 
                            class="cart-qty" onchange='updateQuantity("${item.id}", this.value)' />
                        <button onclick='removeFromCart("${item.id}")' class="remove-btn">Remove</button>
                    </div>
                </div>
            `;
        });

        cartSidebar.innerHTML += `<h3 class="cart-total">Total: $${total}</h3>`;

        const orderButton = document.createElement('button');
        orderButton.textContent = 'Place Order';
        orderButton.classList.add('order-btn');
        orderButton.addEventListener('click', function () {
            alert('Your order has been placed!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });

        cartSidebar.appendChild(orderButton);
        cartSidebar.appendChild(closeButton);
    };

    window.updateQuantity = function (id, quantity) {
        const item = cart.find(item => item.id === id);
        if (item && quantity > 0) {
            item.quantity = parseInt(quantity, 10);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    };

    window.removeFromCart = function (id) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    };
});
