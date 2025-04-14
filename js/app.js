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
    fetch('http://localhost:3000/api/products')
        .then(response => response.json())
        .then(data => {
            carModels = data.products.map(model =>
                new CarModel(model._id, model.brand, model.name, model.scale, model.price, model.image)
            );
            renderCarModels(carModels);
        })
        .catch(error => console.error('Error loading product data:', error));
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
            <button onclick="addToCart('${model.id}')">Add to Cart</button>
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
priceFilter.addEventListener('input', updateFilteredModels);

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
        saveCart();
        renderCart();
    }
}

function renderCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.innerHTML = '<h2 style="text-align: center;">Корзина</h2>';

    let total = 0;
    if (cart.length === 0) {
        cartSidebar.innerHTML += '<p style="text-align: center;">Корзина пуста</p>';
    } else {
        cart.forEach(item => {
            total += item.quantity * item.price;
            cartSidebar.innerHTML += `
                <div style="display: flex; margin-bottom: 15px;">
                    <img src="${item.image}" style="width: 60px; margin-right: 10px;">
                    <div>
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
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        renderCart();
    }
}
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    // 🔶 Створення модального вікна для додавання продукту
    const modal = document.createElement('div');
    modal.id = 'productModal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';

    const content = document.createElement('div');
    content.style.backgroundColor = '#fff';
    content.style.padding = '30px';
    content.style.borderRadius = '12px';
    content.style.width = '400px';
    content.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
    content.innerHTML = `
        <h2 style="text-align:center;">Додати товар</h2>
        <form id="add-product-form">
            <input id="brandInput" placeholder="Бренд" required style="width:100%; margin: 5px 0; padding: 10px;"><br>
            <input id="nameInput" placeholder="Назва моделі" required style="width:100%; margin: 5px 0; padding: 10px;"><br>
            <input id="scaleInput" placeholder="Масштаб (1/64)" required style="width:100%; margin: 5px 0; padding: 10px;"><br>
            <input type="number" id="priceInput" placeholder="Ціна" required style="width:100%; margin: 5px 0; padding: 10px;"><br>
            <input type="file" id="imageInput" accept="image/*" style="margin: 5px 0;"><br>
            <img id="preview" src="" style="display:none; width: 100%; margin-top: 10px;"><br>
            <button type="submit" style="margin-top: 10px; padding: 10px 20px; background:#007bff; color:white; border:none; border-radius:5px;">Зберегти</button>
        </form>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // 🖼 Прев'ю картинки
    let base64Image = '';
    const imageInput = content.querySelector('#imageInput');
    const preview = content.querySelector('#preview');

    imageInput.addEventListener('change', function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function () {
                base64Image = reader.result;
                preview.src = base64Image;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // 📤 Надсилання форми
    const form = content.querySelector('#add-product-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const productData = {
            brand: document.getElementById('brandInput').value,
            name: document.getElementById('nameInput').value,
            scale: document.getElementById('scaleInput').value,
            price: Number(document.getElementById('priceInput').value),
            image: base64Image
        };

        try {
            const response = await fetch('http://localhost:3000/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                  },
                body: JSON.stringify(productData)
            });

            const result = await response.json();
            if (response.ok) {
                alert('Товар додано!');
                form.reset();
                preview.style.display = 'none';
                modal.style.display = 'none';
                loadCarModels();
            } else {
                alert(result.message || 'Помилка додавання товару');
            }
        } catch (err) {
            console.error('Помилка:', err);
        }
    });

    // 📌 Глобальна функція — активується з header.js
    window.showAddProductForm = function () {
        modal.style.display = 'flex';
    };

    loadCarModels();
    loadCart();
});
