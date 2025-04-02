function GenerateCarousel() {
    const carousel = document.createElement('div');
    carousel.className = 'carousel-container';
    carousel.innerHTML = `<div class="carousel-item">
                <img src="/Motos/DEPORTIVAS/KAWASAKI-NINJA650.png" alt="KAWASAKI-NINJA650">
            </div>
            <div class="carousel-item">
                <img src="/Motos/NAKED/YAMAHA-MT03.jpg" alt="YAMAHA-MT03">
            </div>
            <div class="carousel-item">
                <img src="/Motos/TOURING/HONDA-CRF1100ADVENTURE.jpg" alt="HONDA-CRF1100ADVENTURE">
            </div>`;
    return carousel;
}
const contenedor = document.getElementById('carousel');
const carouselmotos = GenerateCarousel();
contenedor.appendChild(carouselmotos);