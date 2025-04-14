class CarModel {
    constructor(id, brand, name, scale, price, image) {
        this.id = id;
        this.brand = brand;
        this.name = name;
        this.scale = scale;
        this.price = price;
        this.image = image;
    }
}

let cart = [];
let carModels = [];

const brandFilter = document.getElementById('brandFilter');
const scaleFilter = document.getElementById('scaleFilter');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const modelsContainer = document.getElementById('models-container');

function loadCarModels() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            carModels = data.map(model =>
                new CarModel(model.id, model.brand, model.name, model.scale, model.price, model.image)
            );
            renderCarModels(carModels);  
        })
        .catch(error => console.error('Error loading the product data:', error)); 
}

function renderCarModels(models) {
    const container = document.getElementById('models-container');
    container.innerHTML = '';

    models.forEach(model => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${model.image}" alt="${model.name}">
            <h3>${model.brand} ${model.name}</h3>
            <p>Scale: ${model.scale}</p>
            <p>Price: $${model.price}</p>
            <button onclick="addToCart(${model.id})">Add to Cart</button>
        `;

        container.appendChild(card);
    });
}

function filterCarModels(brand, scale, price) {
    return carModels.filter(model => {
        const matchesBrand = brand ? model.brand === brand : true;
        const matchesScale = scale ? model.scale === scale : true;
        const matchesPrice = model.price <= price;

        return matchesBrand && matchesScale && matchesPrice;
    });
}

brandFilter.addEventListener('change', updateFilteredModels);
scaleFilter.addEventListener('change', updateFilteredModels);
priceFilter.addEventListener('input', function () {
    updateFilteredModels();
});

function updateFilteredModels() {
    const selectedBrand = brandFilter.value;
    const selectedScale = scaleFilter.value;
    const selectedPrice = priceFilter.value;

    priceValue.textContent = `${selectedPrice}$`;

    const filteredModels = filterCarModels(selectedBrand, selectedScale, selectedPrice);
    renderCarModels(filteredModels);
}

function addToCart(id) {
    const product = carModels.find(model => model.id === id);
    if (product) {
        const existingProduct = cart.find(item => item.id === id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        console.log('Товари в корзині:', cart);
        saveCart();
        renderCart();
    }
}

function renderCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.innerHTML = '<h2 style="text-align: center;">Корзина</h2>';

    let total = 0;
    if (cart.length === 0) {
        cartSidebar.innerHTML += '<p style="text-align: center; font-size: 18px; margin-top: 20px;">Корзина пуста</p>';
    } else {
        cart.forEach(item => {
            total = total + item.quantity * item.price;
            cartSidebar.innerHTML += `
                <div style='display: flex; align-items: center; margin-bottom: 15px;'>
                    <img src='${item.image}' alt='${item.name}' style='width: 60px; height: 60px; margin-right: 10px;'>
                    <div style='flex: 1;'>
                        <h4>${item.name}</h4>
                        <p>Бренд: ${item.brand}</p>
                        <p>Масштаб: ${item.scale}</p>
                        <p>Ціна: $${item.price}</p>
                        <p>Кількість: ${item.quantity}</p>
                    </div>
                </div>
            `;
        });

        cartSidebar.innerHTML += `<h3>Загальна сума: $${total}</h3>`;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
}

function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

document.addEventListener('DOMContentLoaded', function () {
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    // ⬇️ Перевірка користувача
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.username === 'admin') {
        const addProductBtn = document.createElement('button');
        addProductBtn.id = 'add-product-btn';
        addProductBtn.textContent = 'Add Product';
        addProductBtn.style.margin = '10px';
        addProductBtn.style.padding = '10px 20px';
        addProductBtn.style.fontSize = '16px';

        document.body.insertBefore(addProductBtn, document.body.firstChild);

        // Форма (прихована спочатку)
        const form = document.createElement('form');
        form.id = 'add-product-form';
        form.style.display = 'none';
        form.innerHTML = `
            <h2>Додати новий товар</h2>
            <input type="text" id="brandInput" placeholder="Бренд" required><br>
            <input type="text" id="nameInput" placeholder="Назва моделі" required><br>
            <input type="text" id="scaleInput" placeholder="Масштаб (наприклад, 1/64)" required><br>
            <input type="number" id="priceInput" placeholder="Ціна" required><br>
            <input type="text" id="imageInput" placeholder="URL зображення" required><br>
            <button type="submit">Зберегти товар</button>
        `;
        document.body.insertBefore(form, addProductBtn.nextSibling);

        // Показати/приховати форму
        addProductBtn.addEventListener('click', function () {
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        });

        // Обробка сабміту форми
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const newProduct = {
                id: Date.now(),
                brand: document.getElementById('brandInput').value,
                name: document.getElementById('nameInput').value,
                scale: document.getElementById('scaleInput').value,
                price: Number(document.getElementById('priceInput').value),
                image: document.getElementById('imageInput').value
            };

            // Для перевірки:
            console.log('Новий товар:', newProduct);

            // Можна додати в базу через API
            // А поки просто додамо в масив та перемалюємо
            carModels.push(new CarModel(
                newProduct.id,
                newProduct.brand,
                newProduct.name,
                newProduct.scale,
                newProduct.price,
                newProduct.image
            ));
            renderCarModels(carModels);
            form.reset();
            form.style.display = 'none';
        });
    }

    loadCarModels();
    loadCart();
});
