import ApiProduct from '../Service/ProductApi.js';
async function onlyProduct(){
        const productId = sessionStorage.getItem('selectedProductId');
        const product = await ApiProduct.Get(null,null,productId);
        const titleElement = document.querySelector('title');
        titleElement.textContent = product.motoName;
        const container = document.getElementById('product-container');
        const productHTML = `     
            <a class="return-link" href="/Allproducts.html">&lt; VOLVER</a>             
            <div class="product">
                <a href="#"><img src="${product.imageUrl}" alt="${product.motoName}"></a>
            </div>                   
            <div class="product-info">
                <div class="product-tittle"><h1>${product.motoName}</h1></div>
                <div class="product-category"><p><strong>Categoría:</strong> ${product.category.name}</p></div>
                <div class="product-category"><p><strong>Marca:</strong> ${product.mark}</p></div>
                <div class="product-category"><p><strong>Modelo:</strong> ${product.model}</p></div>
                <div class="product-category"><p><strong>Cilindrada:</strong> ${product.cylinder}cc</p></div>
                <p><strong>Precio:</strong> <span style="${product.discount > 0 ? 'text-decoration: line-through; color:red' : ''}">$ ${(product.price * 1.21).toLocaleString('es-AR')}</span></p>
                    ${product.discount > 0 ? `<p><strong>Descuento:</strong> ${product.discount}%</p>` : '<p></p>'}           
                    ${product.discount !== 0 ? `<p style= "color: Green;><strong ">Precio con descuento:</strong> $${((product.price * 1.21) - ((product.price*1.21) * product.discount / 100)).toLocaleString('es-AR')}</p>` : '<p></p>'}
                <div class="product-description"><p><strong>Descripcion:</strong> ${product.description}</p></div>
            </div>
        `;
        container.innerHTML = productHTML;
}


export default onlyProduct;
document.addEventListener('DOMContentLoaded', function () {
    onlyProduct();
});