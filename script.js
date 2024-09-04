////////////////////////////////////////////////////////////

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
    });
});

////////////////////////////////////////////////////////////

document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    searchRecipe();
});

// Recipe search
function searchRecipe() {
    const appId = 'e1534848';
    const appKey = 'ccfb00d9c5608bfe539639ceb38a850b';
    let query = document.getElementById('searchInput').value;
    let url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=0&to=12`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.hits);
        })
        .catch(error => console.error('Error:', error));
}

////////////////////////////////////////////////////////////
// Links Recipe to Source Site
function displayResults(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card">
                <img src="${recipe.recipe.image}" class="card-img-top" alt="${recipe.recipe.label}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.recipe.label}</h5>

                    <a href="${recipe.recipe.url}" target="_blank" class="btn btn-primary">View Recipe</a>
                </div>
            </div>
        `;
        resultsDiv.appendChild(card);
    });
}



////////////////////////////////////////////////////////////

