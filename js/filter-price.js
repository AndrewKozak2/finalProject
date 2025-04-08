const priceSlider = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const modelsContainer = document.getElementById('models-container');

let products = [];  

priceSlider.addEventListener('input', function() {
    priceValue.textContent = priceSlider.value + '$';
    
    const maxPrice = priceSlider.value;
    const filteredProducts = products.filter(product => product.price <= maxPrice);
    renderProducts(filteredProducts);
});

function renderProducts(filteredProducts) {
    modelsContainer.innerHTML = ''; 
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px;">
            <h3>${product.name}</h3>
            <p>Brand: ${product.brand}</p>
            <p>Scale: ${product.scale}</p>
            <p>Price: $${product.price}</p>
        `;

        modelsContainer.appendChild(productElement);
    });
}
fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
        products = data; 
        renderProducts(products); 
    })
    .catch(error => console.error('Error loading products:', error));
