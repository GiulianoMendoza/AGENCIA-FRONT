function filter(){
    const filterDiv = document.createElement('div');
    filterDiv.className = 'search-filter'
    filterDiv.innerHTML = `
        <input type="text" id="search-input" placeholder= "Busca un producto por nombre">
        <div class="ui-search-filter">
            <h3>Categorías:</h3>
            <ul>                
                <li class="ui-search-filter-container"  data-category="1">CUBS</li>
                <li class="ui-search-filter-container"  data-category="2">SCOOTERS</li>
                <li class="ui-search-filter-container"  data-category="3">CALLE</li>
                <li class="ui-search-filter-container"  data-category="4">ENDURO</li>
                <li class="ui-search-filter-container"  data-category="5">TOURING</li>
                <li class="ui-search-filter-container"  data-category="6">NAKED</li>
                <li class="ui-search-filter-container"  data-category="7">RETRO</li>
                <li class="ui-search-filter-container"  data-category="8">DEPORTIVAS</li>
            </ul>
        </div>
        <div class="ui-sort-filter">
        <h3>Ordenar por:</h3>
        <ul>
                <li class="ui-sort-filter-container" data-order="asc">Menor a Mayor</li>
                <li class="ui-sort-filter-container" data-order="desc">Mayor a Menor</li>
        </ul>
        </div>
    `;
    return filterDiv;
}
const contenedor = document.getElementById('filter-container');
const filternav = filter();
contenedor.appendChild(filternav);