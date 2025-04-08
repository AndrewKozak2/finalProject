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

function loadCarModels() {
    fetch('data/products.json')  
        .then(response => response.json())  
        .then(data => {
            const carModels = data.map(model => 
                new CarModel(model.id, model.brand, model.name, model.scale, model.price, model.image)
            );
            renderCarModels(carModels);  
        })
        .catch(error => console.error('Error loading the product data:', error)); 
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const filteredModels = CarModel.filter(model => model.name.toLowerCase().includes(query));
    renderCarModels(filteredModels);  
}

function renderCarModels(models) {
    const container = document.getElementById('models-container');
    if (!container) {
        const newContainer = document.createElement('div');
        newContainer.id = 'models-container';
        document.body.appendChild(newContainer);
    }

    document.getElementById('models-container').innerHTML = ''; 

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

        document.getElementById('models-container').appendChild(card);
    });
}

loadCarModels();

