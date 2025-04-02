import ApiClient from "../Service/ClientApi.js";
let client = await ApiClient.Get();
const clientid = client.clientId;
const storedClientId = localStorage.getItem('clientId');
const sellerId = localStorage.getItem('sellerId');
function GenerateNav() {
    const barraNav = document.createElement('nav');
    barraNav.className = 'navegacion';
    const role = sessionStorage.getItem("role");
    const buyLink = (role === 'vendedor') ? '/Sale.html' : '/Buy.html';
    const showPowerOff = (role === 'vendedor' || role === 'admin' || role === 'tecnico');

    barraNav.innerHTML = `
        <li class="left-links">
            <a href="/index.html" class="texto">
                <img src="/logo.png" alt="ArgenMoto" class="logo">
            </a>
        </li>
        <ul class="menu">
            <li class="left-links menu-opciones"> 
                <a href="index.html"><i class="fa-solid fa-house"></i> INICIO</a>
            </li>
            <li class="left-links menu-opciones"> 
                <a href="US.html"><i class="fa-solid fa-check"></i> NOSOTROS</a>
            </li>
            <li class="left-links menu-opciones"> 
                <a href="/AllProducts.html"><i class="fa-solid fa-motorcycle"></i> NUESTRAS MOTOS</a>
            </li>       
            <li class="left-links menu-opciones"> 
                <a href="/FAQ.html"><i class="fa-regular fa-question"></i> PREGUNTAS FRECUENTES</a>
            </li>
            <li class="left-links menu-opciones"> 
                <a href="Contact.html" target="_blank"><i class="fa-solid fa-phone"></i> CONTACTANOS</a>
            </li>
            <li class="left-links menu-opciones"> 
                <a href="${buyLink}" id="buy-link"><i class="fa-solid fa-bag-shopping"></i></a>
            </li>
            <li class="left-links menu-opciones"> 
                <a href="/Register.html"><i class="fa-solid fa-user"></i></a>
            </li>
            ${clientid === storedClientId ? `
                <li class="left-links menu-opciones"> 
                    <a href="/Posventa.html"><i class="fa-solid fa-toolbox"></i></a>
                </li>
                <li class="left-links menu-opciones"> 
                    <a href="#" id="power-off"><i class="fa-solid fa-power-off"></i></a>
                </li>
            ` : ''}
            ${showPowerOff ? `
                <li class="left-links menu-opciones"> 
                    <a href="#" id="power-off"><i class="fa-solid fa-power-off"></i></a>
                </li>
            ` : ''}
        </ul>
        <div id="login-alert" style="display:none; color:red; font-weight:bold;"></div>
    `;

    return barraNav;
}
const contenedor = document.getElementById('navPrincipal');
const barraNavegacion = GenerateNav();
contenedor.appendChild(barraNavegacion);
function showModal(message) {
    const alertModal = document.getElementById('alertModal');
    const alertMessage = document.getElementById('alertMessage');
    
    alertMessage.textContent = message;
    alertModal.style.display = 'block';
    const closeModal = document.getElementById('closeModal');
    closeModal.onclick = function() {
        alertModal.style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target === alertModal) {
            alertModal.style.display = 'none';
        }
    };
}
document.addEventListener('DOMContentLoaded', function () {
    const buyLink = document.getElementById('buy-link');
    const loginAlert = document.getElementById('login-alert');
    function checkLoginAndCart() {
        const authToken = sessionStorage.getItem('authToken'); 
        const cart = JSON.parse(localStorage.getItem('cart')) || []; 
        loginAlert.style.display = 'none';
        loginAlert.textContent = '';
        if (!authToken) {
            showModal('Logueate para comprar');
            return false;
        }
        if (cart.length === 0) {
            showModal('Debes tener productos en el carrito para continuar con la compra.');
            return false;
        }

        return true;
    }
    buyLink.addEventListener('click', function (event) {
        if (!checkLoginAndCart()) {
            event.preventDefault(); 
        }
    });
});
const powerOffButton = document.getElementById('power-off');
if (powerOffButton) {
    powerOffButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        localStorage.removeItem('clientId'); 
        sessionStorage.removeItem('role');
        window.location.href = '/index.html';
    });
}