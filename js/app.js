// Клас для моделі машин
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

// Масив для зберігання товарів у кошику
let cart = [];

// Масив моделей машин
let carModels = [];

// Отримуємо елементи фільтрів
const brandFilter = document.getElementById('brandFilter');
const scaleFilter = document.getElementById('scaleFilter');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue'); // елемент для показу значення ціни
const modelsContainer = document.getElementById('models-container');

// Функція для завантаження моделей машин
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

// Функція для рендерингу товарів на сторінці
function renderCarModels(models) {
    const container = document.getElementById('models-container');
    container.innerHTML = ''; // Очищаємо контейнер перед новим рендером

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

// Функція для фільтрації моделей
function filterCarModels(brand, scale, price) {
    return carModels.filter(model => {
        const matchesBrand = brand ? model.brand === brand : true;
        const matchesScale = scale ? model.scale === scale : true;
        const matchesPrice = model.price <= price;

        return matchesBrand && matchesScale && matchesPrice;
    });
}

// Обробники подій для фільтрів
brandFilter.addEventListener('change', updateFilteredModels);
scaleFilter.addEventListener('change', updateFilteredModels);
priceFilter.addEventListener('input', function () {
    updateFilteredModels();
});

// Функція для оновлення фільтрованих моделей на основі вибору
function updateFilteredModels() {
    const selectedBrand = brandFilter.value;
    const selectedScale = scaleFilter.value;
    const selectedPrice = priceFilter.value;

    // Оновлюємо відображення значення ціни
    priceValue.textContent = `${selectedPrice}$`;

    const filteredModels = filterCarModels(selectedBrand, selectedScale, selectedPrice);
    renderCarModels(filteredModels);
}

// Функція для додавання товару до корзини
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
        saveCart(); // Зберігаємо оновлений кошик в localStorage
        renderCart(); // Оновлюємо відображення кошика
    }
}

// Функція для відображення кошика
function renderCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.innerHTML = '<h2 style="text-align: center;">Корзина</h2>';

    let total = 0;
    if (cart.length === 0) {
        cartSidebar.innerHTML += '<p style="text-align: center; font-size: 18px; margin-top: 20px;">Корзина пуста</p>';
    } else {
        cart.forEach(item => {
            total += item.quantity * item.price;
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

// Функція для збереження кошика в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функція для завантаження кошика з localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart(); // Оновлюємо відображення кошика після завантаження
    }
}

// Функція для очищення кошика
function clearCart() {
    cart = [];
    saveCart(); // Очищаємо кошик в localStorage
    renderCart(); // Оновлюємо відображення кошика
}

// Додати обробник події на кнопку очищення кошика
document.addEventListener('DOMContentLoaded', function () {
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }
    
    loadCarModels();  // Завантажуємо моделі машин
    loadCart();  // Завантажуємо кошик
});
