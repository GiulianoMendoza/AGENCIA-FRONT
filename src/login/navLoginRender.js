function renderNav() {
    const nav = document.createElement('div');
    nav.className = 'container'
    nav.innerHTML = `
            <div class="logo-site">
                <a href="/index.html" class="logo-link"><img src="./logo.png" alt=""></a>
            </div>
    `;
    return nav;
}
const contenedor = document.querySelector('.navbar');
const navLogin = renderNav();
contenedor.appendChild(navLogin);
