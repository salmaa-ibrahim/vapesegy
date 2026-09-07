// src/components/HeroCarousel.jsx
import React, { useState, useEffect } from 'react';
import './HeroCarousel.css';

const slides = [
  {
    id: 1,
    image: '/images/banners/hero-banner-1.jpg',
    alt: 'Vapesegy Promotion',
  },
  {
    id: 2,
    image: '/images/banners/hero-banner-2.jpg',
    alt: 'Vapesegy Summer Sale',
  },
  {
    id: 3,
    image: '/images/banners/hero-banner-3.webp',
    alt: 'Vapesegy New Arrivals',
  },
   {
    id: 4,
    image: '/images/banners/hero-banner-4.jpg',
    alt: 'Vapesegy New Arrivals',
  },
   {
    id: 5,
    image: '/images/banners/hero-banner-5.jpg',
    alt: 'Vapesegy New Arrivals',
  },
  {
    id: 6,
    image: '/images/banners/hero-banner-6.jpg',
    alt: 'Vapesegy New Arrivals',
  },
];

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatic slide change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        return (prevIndex + 1) % slides.length;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="hero-carousel">

      {/* Slides */}
      <div className="carousel-slides">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${
              index === currentIndex ? 'active' : ''
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="carousel-image"
            />
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`indicator ${
              index === currentIndex ? 'active' : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
}

export default HeroCarousel;
