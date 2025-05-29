// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const dropdowns = document.querySelectorAll('.dropdown');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Handle dropdowns on mobile
dropdowns.forEach(dropdown => {
  const trigger = dropdown.querySelector('.dropdown-trigger');
  trigger.addEventListener('click', (e) => {
    if (window.innerWidth <= 600) {
      e.preventDefault();
      dropdown.classList.toggle('active');
    }
  });
});

// Hero carousel functionality
const slides = document.querySelectorAll('.hero-carousel .carousel-slide');
const prevBtn = document.querySelector('.hero-carousel .carousel-btn.prev');
const nextBtn = document.querySelector('.hero-carousel .carousel-btn.next');

let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Auto slide every 5 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Featured & Upcoming Products Carousels
function initProductCarousel(sectionClass) {
  const container = document.querySelector(sectionClass);
  if (!container) return;

  const track = container.querySelector('.carousel-track');
  const prevBtn = container.querySelector('.carousel-btn.prev');
  const nextBtn = container.querySelector('.carousel-btn.next');
  const cards = container.querySelectorAll('.feature-card');
  const cardWidth = cards[0].offsetWidth + 16; // card width + gap (1rem=16px)
  let position = 0;
  const maxPosition = -(cardWidth * (cards.length - Math.floor(container.offsetWidth / cardWidth)));

  prevBtn.addEventListener('click', () => {
    position += cardWidth;
    if (position > 0) position = 0;
    track.style.transform = `translateX(${position}px)`;
  });

  nextBtn.addEventListener('click', () => {
    position -= cardWidth;
    if (position < maxPosition) position = maxPosition;
    track.style.transform = `translateX(${position}px)`;
  });

  // Responsive handling on resize
  window.addEventListener('resize', () => {
    position = 0;
    track.style.transform = `translateX(0)`;
  });
}

initProductCarousel('.feature-carousel');
initProductCarousel('.upcoming-carousel');

// Currency switcher
const currencySelect = document.getElementById('currency');
const prices = document.querySelectorAll('.price-tag');

// Base prices are assumed to be in INR as per your HTML

// Currency conversion rates relative to INR (example rates)
const rates = {
  INR: 1,
  USD: 0.012,   // 1 INR = 0.012 USD (approx)
  EUR: 0.011,
  GBP: 0.0097
};

// Currency symbols
const symbols = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

// Store original INR prices as data attribute to avoid cumulative conversion errors
prices.forEach(priceTag => {
  priceTag.dataset.inrPrice = priceTag.textContent.replace(/[^\d]/g, '');
});

currencySelect.addEventListener('change', () => {
  const selectedCurrency = currencySelect.value;

  prices.forEach(priceTag => {
    const inrPrice = parseFloat(priceTag.dataset.inrPrice);
    const convertedPrice = (inrPrice * rates[selectedCurrency]).toFixed(2);
    priceTag.textContent = `${symbols[selectedCurrency]}${convertedPrice}`;
  });
});
