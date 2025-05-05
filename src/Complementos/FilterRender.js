function filter() {
    const isMobile = window.innerWidth <= 768;

    const filterDiv = document.createElement('div');
    filterDiv.className = 'search-filter';

    let categoriasHTML = `
        <li class="ui-search-filter-container" data-category="1">CUBS</li>
        <li class="ui-search-filter-container" data-category="2">SCOOTERS</li>
        <li class="ui-search-filter-container" data-category="3">CALLE</li>
        <li class="ui-search-filter-container" data-category="4">ENDURO</li>
        <li class="ui-search-filter-container" data-category="5">TOURING</li>
        <li class="ui-search-filter-container" data-category="6">NAKED</li>
        <li class="ui-search-filter-container" data-category="7">RETRO</li>
        <li class="ui-search-filter-container" data-category="8">DEPORTIVAS</li>
    `;

    let ordenarHTML = `
        <li class="ui-sort-filter-container" data-order="asc">Menor a Mayor</li>
        <li class="ui-sort-filter-container" data-order="desc">Mayor a Menor</li>
    `;

    filterDiv.innerHTML = `
        <input type="text" id="search-input" placeholder="Busca un producto por nombre">
        ${
            isMobile
            ? `
                <details class="ui-search-filter">
                    <summary>Categorías:</summary>
                    <ul>${categoriasHTML}</ul>
                </details>
                <details class="ui-sort-filter">
                    <summary>Ordenar por:</summary>
                    <ul>${ordenarHTML}</ul>
                </details>
              `
            : `
                <div class="ui-search-filter">
                    <h3>Categorías:</h3>
                    <ul>${categoriasHTML}</ul>
                </div>
                <div class="ui-sort-filter">
                    <h3>Ordenar por:</h3>
                    <ul>${ordenarHTML}</ul>
                </div>
              `
        }
    `;
    return filterDiv;
}
const contenedor = document.getElementById('filter-container');
contenedor.innerHTML = ''; 
contenedor.appendChild(filter());
