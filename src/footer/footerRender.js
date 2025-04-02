function Generatefooter() {
    const footNav = document.createElement('footer');
    footNav.className = 'footer-general';
    footNav.innerHTML = `
    <div class="footer-container">
        <div class="footer-content">
            <div class="footer-logo">
                <img src="../../logo.png" alt="Logo ArgenMoto">
            </div>
            <div class="footer-links">
                <ul>
                    <li><a href="US.html">Nosotros</a></li>
                    <li><a href="AllProducts.html">Motos</a></li>
                    <li><a href="FAQ.html">Preguntas Frecuentes</a></li>
                    <li><a href="Contact.html" target="_blank">Contacto</a></li>
                </ul>
            </div>
            <div class="footer-social">
                <ul>
                    <li><a href="https://www.facebook.com/profile.php?id=61560734540696" target="_blank"><i class="fab fa-facebook">  <span>Facebook</span> </i></a></li>
                    <li><a href="https://x.com/ArgenMotoUnaj" target="_blank"><i class="fa-brands fa-x-twitter">  <span>X</span> </i></a></li>
                    <li><a href="https://www.instagram.com/argenmotounaj/"  target="_blank"><i class="fab fa-instagram">  <span>Instagram</span> </i></a></li>
                    <li><a href="US.html"><i class="fa-solid fa-location-dot">  <span>Ubicación</span> </i></a></li>
                </ul>
            </div>
            </div>
            <div class="footer-disclaimer">
                <p>&copy; 2024 Astro. Todos los derechos reservados.</p>
            </div>
    </div>
    `;
    return footNav;
}
const contenedor = document.getElementById('footer-general');
const footerNavegacion = Generatefooter();
contenedor.appendChild(footerNavegacion);