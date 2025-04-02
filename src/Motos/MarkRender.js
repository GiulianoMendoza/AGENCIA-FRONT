function GenerateBrandGallery() {
    const brandGallery = document.createElement('div');
    brandGallery.className = 'brand-gallery';
    brandGallery.innerHTML = `        <h2 id="text-mark">Marcas</h2>
    <div class="brands-container">
        <div class="brand-item">
            <img src="/Motos/Marcas/yamaha.png" alt="Yamaha">
        </div>
        <div class="brand-item">
            <img src="/Motos/Marcas/Honda.png" alt="Honda">
        </div>
        <div class="brand-item">
            <img src="/Motos/Marcas/Kawasaki.png" alt="Kawasaki">
        </div>
        <div class="brand-item">
            <img src="/Motos/Marcas/Benelli.png" alt="Benelli">
        </div>
        <div class="brand-item">
            <img src="/Motos/Marcas/Zanella.png" alt="Zanella">
        </div>
        <div class="brand-item">
            <img src="/Motos/Marcas/gilera.png" alt="Gilera">
        </div>
        <div class="brand-item">
            <img src="/Motos/Marcas/corven.png" alt="Corven">
        </div>
        <div class="brand-item">
            <img src="/Motos/Marcas/bajaj.png" alt="Bajaj">
        </div>
    </div>
`;
return brandGallery;
}
const contenedor = document.getElementById('Mark');
const brandGallery = GenerateBrandGallery();
contenedor.appendChild(brandGallery);