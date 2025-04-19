const carousel = document.getElementById('carousel');
const totalSlides = carousel.children.length;
let currentSlide = 0;

function updateCarousel() {
  const offset = -currentSlide * 100;
  carousel.style.transform = `translateX(${offset}%)`;
}

document.getElementById('next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
});

document.getElementById('prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
});