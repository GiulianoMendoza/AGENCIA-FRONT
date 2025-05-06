import ApiProduct from '../Service/ProductApi.js';
import addcart from '../Complementos/Cart.js';
import displayCartCounter from '../Sale/Carrito.js';
import pagination from '../Complementos/Filterpagination.js';

const cart = [];
let currentPage = parseInt(localStorage.getItem('currentPage')) || 1;
let productsPerPage = parseInt(localStorage.getItem('productsPerPage')) || 8;

async function renderProducts(currentPage) {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(...savedCart);
    const limit = productsPerPage;
    const offset = productsPerPage * (currentPage - 1);
    const totalProducts = await getTotalProducts();
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await ApiProduct.Get(null, null, null, limit, offset);
    const container = document.getElementById('productos-list');
    container.innerHTML = '';

    products.forEach(product => {
        const productHTML = `
        <div class="producto" data-categoryname="${product.categoryname}">
            <button 
                class="compartir-button" 
                data-product-id="${product.motoId}"
                data-product-name="${product.motoName}"
                title="Compartir por WhatsApp"
            >🔗</button>
            <a href="Product.html" class="product-link" data-product-id="${product.motoId}">
                <img src="${product.imageUrl}" alt="${product.motoName}">
            </a>
            <hr id="line">
            <h3>${product.motoName}</h3>
            <p><strong>Precio:</strong> <span style="${product.discount > 0 ? 'text-decoration: line-through; color:red' : ''}">$ ${(product.price * 1.21).toLocaleString('es-AR')}</span></p>
            ${product.discount > 0 ? `<p><strong>Descuento:</strong> ${product.discount}%</p>` : '<p></p>'}           
            ${product.discount !== 0 ? `<p style="color: green;"><strong>Precio con descuento:</strong> $${((product.price * 1.21) - ((product.price * 1.21) * product.discount / 100)).toLocaleString('es-AR')}</p>` : '<p></p>'}                    
            <button data-product-id="${product.motoId}" id="ver-mas-button" class="ver-mas"><a href="/Product.html" class="ver-mas">VER MÁS</a></button>
            <button class="buy-button">
                <p class="addtocart" id="fontaddtocart"><strong>AGREGAR AL CARRITO</strong></p>
                <input type="number" class="vquantity-input" value="1" min="1">
            </button>                   
        </div>
    `;
        container.innerHTML += productHTML;
    });

    addcart.Get(products, cart, displayCartCounter);

    const productLinks = document.querySelectorAll('.product-link');
    productLinks.forEach(link => {
        link.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            sessionStorage.setItem('selectedProductId', productId);
        });
    });

    const productMore = document.querySelectorAll('.ver-mas');
    productMore.forEach(link => {
        link.addEventListener('click', function () {
            const productMoreId = this.getAttribute('data-product-id');
            sessionStorage.setItem('selectedProductId', productMoreId);
        });
    });

    const compartirButtons = document.querySelectorAll('.compartir-button');
    compartirButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-product-id');
            const productName = this.getAttribute('data-product-name');
            const currentHost = window.location.origin;
            const compartirUrl = `${currentHost}/Product.html?id=${productId}`;

            const modal = document.getElementById('compartir-modal');
            modal.dataset.compartirUrl = compartirUrl;
            modal.dataset.productName = productName;
            modal.style.display = 'flex';
        });
    });

    pagination.Get(totalPages, currentPage, renderProducts);
}

async function getTotalProducts() {
    const productstotal = await ApiProduct.Get(null, null, null, null)
    return productstotal.length;
}

export { cart };
export default renderProducts;

document.addEventListener('DOMContentLoaded', function () {
    renderProducts(currentPage);
    displayCartCounter.Get();

    // modal whatsapp
    const modal = document.createElement('div');
    modal.id = 'compartir-modal';
    modal.style.display = 'none';
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <P>COMPARTIR PRODUCTO POR WHATSAPP</P>
            <input type="text" id="whatsapp-number" placeholder="Ej: 5491141123456" />
            <button id="compartir">COMPARTIR</button>
        </div>
    `;
    document.body.appendChild(modal);

    const style = document.createElement('style');

    document.head.appendChild(style);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.getElementById('compartir').addEventListener('click', () => {
        const number = document.getElementById('whatsapp-number').value.trim();
        const compartirUrl = modal.dataset.compartirUrl;
        const productName = modal.dataset.productName;
        const message = `Hola, mirá esta moto: ${productName} - ${encodeURIComponent(compartirUrl)}`;
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;
        window.open(whatsappUrl, '_blank');

        modal.style.display = 'none';
        document.getElementById('whatsapp-number').value = '';
    });
});
