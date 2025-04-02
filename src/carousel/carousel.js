let currentSlide = 0;
const slideInterval = 7000; 

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    document.querySelector('.carousel-container').style.transform = `translateX(-${currentSlide * 100}%)`;
}
function autoSlide() {
    moveSlide(1);
}
document.addEventListener('DOMContentLoaded', () => {
    setInterval(autoSlide, slideInterval);
});