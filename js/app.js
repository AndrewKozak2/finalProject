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
    fetch('https://truescale-backend.onrender.com/api/products')
        .then(response => response.json())
        .then(data => {
            carModels = data.map(model =>
                new CarModel(model._id, model.brand, model.name, model.scale, model.price, model.image)
            );
            populateBrandFilter();
            renderCarModels(carModels);
        })
        .catch(error => console.error('Error loading product data:', error));
}

function populateBrandFilter() {
    const brands = [...new Set(carModels.map(model => model.brand))];
    const desiredOrder = [
        "MiniGT",
        "Kaido House",
        "INNO64",
        "Tarmac Works",
        "CM Model",
        "Time Micro"
    ];
    const orderedBrands = desiredOrder.filter(brand => brands.includes(brand));
    brandFilter.innerHTML = '<option value="">All</option>';
    orderedBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

function renderCarModels(models) {
    modelsContainer.innerHTML = '';
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
        modelsContainer.appendChild(card);
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
    cartSidebar.innerHTML = '<h2 style="text-align: center;">Cart</h2>';
    let total = 0;
    if (cart.length === 0) {
        cartSidebar.innerHTML += '<p style="text-align: center;">Cart is empty</p>';
    } else {
        cart.forEach(item => {
            total += item.quantity * item.price;
            cartSidebar.innerHTML += `
                <div style="display: flex; margin-bottom: 15px;">
                    <img src="${item.image}" style="width: 60px; margin-right: 10px;">
                    <div>
                        <h4>${item.name}</h4>
                        <p>Brand: ${item.brand}</p>
                        <p>Scale: ${item.scale}</p>
                        <p>Price: $${item.price}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                </div>
            `;
        });
        cartSidebar.innerHTML += `<h3>Total: $${total}</h3>`;
    }
}

function loadNewArrivals() {
    fetch('https://truescale-backend.onrender.com/api/products/latest')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('new-arrivals-container');
            container.innerHTML = '';
            data.forEach(model => {
                const card = document.createElement('div');
                card.classList.add('new-arrival-card');
                card.innerHTML = `
                    <img src="${model.image}" alt="${model.name}">
                    <h3>${model.brand} ${model.name}</h3>
                    <p>Scale: ${model.scale}</p>
                    <p>Price: $${model.price}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching latest products:', error);
        });
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

    // Модалка
    const modal = document.createElement('div');
    modal.id = 'productModal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '9999';

    const content = document.createElement('div');
    content.style.backgroundColor = '#1f1f1f';
    content.style.padding = '40px';
    content.style.borderRadius = '16px';
    content.style.width = '400px';
    content.style.color = '#fff';
    content.style.position = 'relative';
    content.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.4)';
    content.style.fontFamily = 'Poppins, sans-serif';

    const closeButton = document.createElement('button');
    closeButton.textContent = '✖';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '12px';
    closeButton.style.right = '16px';
    closeButton.style.background = 'none';
    closeButton.style.border = 'none';
    closeButton.style.color = '#fff';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    });

    content.innerHTML = `
        <h2 style="text-align:center; margin-bottom: 20px;">Add Product</h2>
        <form id="add-product-form">
            <input id="brandInput" placeholder="Brand" required style="width:100%; margin-bottom: 10px; padding: 10px; border-radius: 8px; border: none;"><br>
            <input id="nameInput" placeholder="Model name" required style="width:100%; margin-bottom: 10px; padding: 10px; border-radius: 8px; border: none;"><br>
            <input id="scaleInput" placeholder="Scale (1/64)" required style="width:100%; margin-bottom: 10px; padding: 10px; border-radius: 8px; border: none;"><br>
            <input type="number" id="priceInput" placeholder="Price" required style="width:100%; margin-bottom: 10px; padding: 10px; border-radius: 8px; border: none;"><br>
            <div style="position: relative; margin-bottom: 10px;">
                <label for="imageInput" style="
                    display: inline-block;
                    background-color: #007bff;
                    color: white;
                    padding: 6px 12px;
                    font-size: 14px;
                    border-radius: 6px;
                    cursor: pointer;
                ">Choose File</label>
                <input type="file" id="imageInput" accept="image/*" style="
                    opacity: 0;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                ">
            </div>
            <img id="preview" src="" style="display:none; width: 100%; border-radius: 8px; margin-bottom: 10px;"><br>
            <button type="submit" style="margin-top: 10px; padding: 12px; width: 100%; background:#007bff; color:white; border:none; border-radius:8px; font-weight: 600; cursor:pointer;">Save</button>
        </form>
    `;

    content.appendChild(closeButton);
    modal.appendChild(content);
    document.body.appendChild(modal);

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
            const response = await fetch('https://truescale-backend.onrender.com/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(productData)
            });

            const result = await response.json();
            if (response.ok) {
                alert('Product added!');
                form.reset();
                preview.style.display = 'none';
                modal.style.display = 'none';
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                loadCarModels();
                loadNewArrivals();
            } else {
                alert(result.message || 'Error adding product');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    });

    window.showAddProductForm = function () {
        if (modal.style.display !== 'flex') {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        }
    };

    loadCarModels();
    loadCart();
    loadNewArrivals();
});
