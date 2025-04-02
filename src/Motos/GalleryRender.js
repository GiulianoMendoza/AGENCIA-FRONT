function GenerateGallery() {
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
    gallery.innerHTML = `
        <!-- Galería de motos -->
        <div class="gallery-item">
            <img src="/Motos/CUBS/CORVEN-ENERGYTUNNING110.jpg" alt="CUBS">
            <div class="overlay">
                <div class="text">CUBS</div>
            </div>
        </div>
        <div class="gallery-item">
            <img src="/Motos/SCOOTERS/HONDA-PCX160.jpg" alt="SCOOTERS">
            <div class="overlay">
                <div class="text">SCOOTERS</div>
            </div>
        </div>
        <div class="gallery-item">
            <img src="/Motos/CALLE/YAMAHA-FZSFIV3.jpg" alt="CALLE">
            <div class="overlay">
                <div class="text">CALLE</div>
            </div>
        </div>
        <div class="gallery-item">
            <img src="/Motos/ENDURO/HONDA-CRF450RX.jpg" alt="ENDURO">
            <div class="overlay">
                <div class="text">ENDURO</div>
            </div>
        </div>
        <div class="gallery-item">
            <img src="/Motos/TOURING/HONDA-CRF1100ADVENTURE.jpg" alt="TOURING">
            <div class="overlay">
                <div class="text">TOURING</div>
            </div>
        </div>
        <div class="gallery-item">
            <img src="/Motos/NAKED/YAMAHA-MT03.jpg" alt="NAKED">
            <div class="overlay">
                <div class="text">NAKED</div>
            </div>
        </div>
        <div class="gallery-item">
            <img src="/Motos/RETRO/BENELLI-502CRUISER.jpg" alt="RETRO">
            <div class="overlay">
                <div class="text">RETRO</div>
            </div>
        </div>
        <div class="gallery-item">
            <img src="/Motos/DEPORTIVAS/KAWASAKI-NINJA650.png" alt="DEPORTIVAS">
            <div class="overlay">
                <div class="text">DEPORTIVAS</div>
            </div>
        </div>`;
return gallery;
}
const contenedor = document.getElementById('gallery');
const motoGallery = GenerateGallery();
contenedor.appendChild(motoGallery);