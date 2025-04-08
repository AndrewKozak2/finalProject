
const brandFilter = document.getElementById('brandFilter');
const scaleFilter = document.getElementById('scaleFilter');
const priceFilter = document.getElementById('priceFilter');
const priceValue = document.getElementById('priceValue');
const modelsContainer = document.getElementById('models-container');

let carModels = [];

function loadCarModels() {
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            carModels = data.map(model => new CarModel(model.id, model.brand, model.name, model.scale, model.price, model.image));
            renderCarModels(carModels); 
        })
        .catch(error => console.error('Помилка завантаження даних:', error));
}

function updateFilteredModels() {
    const selectedBrand = brandFilter.value;
    const selectedScale = scaleFilter.value;
    const selectedPrice = priceFilter.value;

    const filteredModels = carModels.filter(model => {
        const matchesBrand = selectedBrand ? model.brand === selectedBrand : true;
        const matchesScale = selectedScale ? model.scale === selectedScale : true;
        const matchesPrice = model.price <= selectedPrice;

        return matchesBrand && matchesScale && matchesPrice;
    });

    renderCarModels(filteredModels);
}

brandFilter.addEventListener('change', updateFilteredModels);
scaleFilter.addEventListener('change', updateFilteredModels);
priceFilter.addEventListener('input', function () {
    priceValue.textContent = `${priceFilter.value}$`;
    updateFilteredModels();
});
loadCarModels();