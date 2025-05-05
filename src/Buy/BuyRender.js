import ApiSale from '../Service/SaleApi.js';

async function GenerateBuy() {
    // Cliente hardcodeado
    const Client = {
        email: 'Giulianovictorm98@gmail.com',
        name: 'Giuliano',
        surname: 'Mendoza',
        phone: '1141462757'
    };

    const today = new Date();
    const pickupDate = new Date();
    pickupDate.setDate(today.getDate() + 7);
    const formattedPickupDate = pickupDate.toLocaleDateString('es-AR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
    });

    const Buy = document.createElement('div');
    Buy.className = 'formulario';
    Buy.innerHTML = `
        <div class="seccion">
            <h2>1. Email</h2>
            <input type="email" value="${Client.email}" readonly>
        </div>
        <div class="seccion">
            <h2>2. Identificación</h2>
            <p>${Client.name} ${Client.surname}</p>
            <p>${Client.phone}</p>
        </div>
        <div class="seccion">
            <h2>3. Envío</h2>
            <p>RETIRO EN LA TIENDA (Disponible a partir del ${formattedPickupDate})</p>
        </div>
        <div class="seccion">
            <h2>4. Pago</h2>
            <select id="payment-method">
                <option value="none">Selecciona un método de pago</option>
                <option value="debit">Tarjeta de débito</option>
                <option value="credit">Tarjeta de crédito</option>
                <option value="qr">QR</option>
            </select>
            <div id="payment-details"></div>
        </div>
    `;
    const resume = await generateCartResume();

    return [Buy, resume];
}

async function generateCartResume() {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const resume = document.createElement('div');
    resume.className = 'resumen-compra';
    resume.innerHTML = `
        <h3>Resumen de la compra</h3>
        ${savedCart.map(product => `
            <div class="item-compra">
                <img src="${product.img}" alt="${product.motoName}">
                <p>${product.motoName}</p>
                <p>Cantidad: ${product.quantity}</p>
                <p>Precio: $${(product.price * 1.21).toLocaleString('es-AR')}</p>
            </div>
        `).join('')}
        <p>Subtotal: $${savedCart.reduce((sum, product) => sum + (product.price * product.quantity * 1.21), 0).toLocaleString('es-AR')}</p>
        <p>Gastos de envío: Gratis</p>
        <h4>Total: $${savedCart.reduce((sum, product) => sum + (product.price * product.quantity * 1.21), 0).toLocaleString('es-AR')}</h4>
        <button class="btn-comprar">Comprar ahora</button>
    `;
    return resume;
}

document.addEventListener('DOMContentLoaded', function () {
    const contenedor = document.getElementById('container');
    GenerateBuy().then(FormBuy => {
        FormBuy.forEach(element => contenedor.appendChild(element));

        const comprarBtn = document.querySelector('.btn-comprar');
        comprarBtn.disabled = true;

        comprarBtn.addEventListener('click', async () => {
            const paymentMethod = document.getElementById('payment-method').value;
            if (paymentMethod === 'debit' || paymentMethod === 'credit') {
                const cardFields = [
                    document.querySelector('input[placeholder="Número de tarjeta"]'),
                    document.querySelector('input[placeholder="Nombre en la tarjeta"]'),
                    document.querySelector('input[placeholder="DNI del titular"]'),
                    document.querySelector('input[placeholder="CVV"]'),
                    document.querySelector('input[placeholder="Fecha de caducidad (MM/AA)"]')
                ];
                const allFieldsFilled = cardFields.every(field => field.value.trim() !== '');
                if (!allFieldsFilled) {
                    alert("Por favor, completa todos los campos de la tarjeta.");
                    return;
                }
            }
            const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalPayed = savedCart.reduce((sum, product) => sum + (product.price * product.quantity * 1.21), 0);
            let products = [];
            for (let i = 0; i < savedCart.length; i++) {
                products.push({
                    motoId: savedCart[i].id,
                    quantity: +savedCart[i].quantity
                });
            }
            const result = await ApiSale.Post(products, totalPayed);
            if (result && result.clientId) {
                localStorage.setItem('clientId', result.clientId);
            } else {
                console.error('clientId no encontrado en la respuesta');
            }
            localStorage.removeItem('cart');
            showModal();
        });
    });
});

function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
        window.location.href = '/index.html';
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            window.location.href = '/index.html';
        }
    }
}

document.addEventListener('change', function (event) {
    const paymentDetails = document.getElementById('payment-details');
    const comprarBtn = document.querySelector('.btn-comprar');

    if (event.target.id === 'payment-method') {
        const method = event.target.value;
        if (method === 'debit' || method === 'credit') {
            paymentDetails.innerHTML = `
                <h3>Datos de la tarjeta</h3>
                <input type="text" placeholder="Número de tarjeta" maxlength="16">
                <input type="text" placeholder="Nombre en la tarjeta">
                <input type="text" placeholder="DNI del titular">
                <input type="text" placeholder="CVV" maxlength="3">
                <input type="text" placeholder="Fecha de caducidad (MM/AA)" maxlength="5">
            `;
            const cardFields = document.querySelectorAll('#payment-details input');
            cardFields.forEach(field => {
                field.addEventListener('input', () => {
                    const allFilled = Array.from(cardFields).every(input => input.value.trim() !== '');
                    comprarBtn.disabled = !allFilled;
                });
            });
            comprarBtn.disabled = false;
        } else if (method === 'qr') {
            paymentDetails.innerHTML = `<img src="../../Tarjetas/QR.png" alt="Código QR" id="QR">`;
            comprarBtn.disabled = false;
        } else {
            paymentDetails.innerHTML = '';
            comprarBtn.disabled = true;
        }
    }
});
