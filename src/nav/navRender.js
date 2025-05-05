function GenerateNav() {
    const barraNav = document.createElement('nav');
    barraNav.className = 'navegacion';
    barraNav.innerHTML = `
        <div class="nav-container">
            <div class="nav-logo">
                <a href="/index.html" class="texto">
                    <img src="/logo.png" alt="ArgenMoto" class="logo">
                </a>
            </div>
            
            <div class="menu-toggle" id="menu-toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>            
            <ul class="menu" id="menu">
                <li class="menu-opciones" id="inicio">
                    <a href="index.html"><i class="fa-solid fa-house"></i> <span class="menu-text">INICIO</span></a>
                </li>
                <li class="menu-opciones" id="nosotros">
                    <a href="US.html"><i class="fa-solid fa-check"></i> <span class="menu-text">NOSOTROS</span></a>
                </li>
                <li class="menu-opciones" id="motos">
                    <a href="/AllProducts.html"><i class="fa-solid fa-motorcycle"></i> <span class="menu-text">NUESTRAS MOTOS</span></a>
                </li>
                <li class="menu-opciones" id="preguntas">
                    <a href="/FAQ.html"><i class="fa-regular fa-question"></i> <span class="menu-text">PREGUNTAS FRECUENTES</span></a>
                </li>
                <li class="menu-opciones">
                    <a href="Contact.html"><i class="fa-solid fa-phone"></i> <span class="menu-text">CONTACTANOS</span></a>
                </li>
                <li class="menu-opciones" id="compras">
                    <a href="/Buy.html" id="buy-link"><i class="fa-solid fa-bag-shopping"></i> <span class="menu-text">COMPRAS</span></a>
                </li>
                <li class="menu-opciones" id="cuenta">
                    <a href="/Register.html"><i class="fa-solid fa-user"></i> <span class="menu-text">CUENTA</span></a>
                </li>
            </ul>
        </div>
    `;
    
    return barraNav;
}

document.addEventListener('DOMContentLoaded', function() {
    const contenedor = document.getElementById('navPrincipal');
    const barraNavegacion = GenerateNav();
    contenedor.appendChild(barraNavegacion);
    
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    
    function toggleMenu() {
        menu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    
    const menuLinks = document.querySelectorAll('.menu-opciones a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                toggleMenu();
            }
        });
    });
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});