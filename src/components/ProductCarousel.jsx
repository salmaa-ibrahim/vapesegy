// src/components/ProductCarousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard.jsx';
import './ProductCarousel.css';

function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(5);
  const intervalRef = useRef(null);

  if (!products || products.length === 0) {
    return null;
  }

  // تحديد عدد المنتجات المعروضة حسب حجم الشاشة
  const updateItemsPerView = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      setItemsPerView(5);
    } else if (width >= 992) {
      setItemsPerView(4);
    } else if (width >= 768) {
      setItemsPerView(3);
    } else {
      setItemsPerView(2);
    }
  };

  // تحديث عدد المنتجات عند تغيير حجم الشاشة
  useEffect(() => {
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // إعادة تعيين المؤشر الحالي إذا تغير عدد المنتجات المعروضة
  useEffect(() => {
    const totalSlides = Math.ceil(products.length / itemsPerView);
    const maxIndex = Math.max(0, totalSlides - 1);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerView, products.length, currentIndex]);

  const totalSlides = Math.ceil(products.length / itemsPerView);
  const maxIndex = Math.max(0, totalSlides - 1);

  const goToSlide = (index) => {
    let newIndex = index;
    if (newIndex < 0) newIndex = maxIndex;
    if (newIndex > maxIndex) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  // التمرير التلقائي
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  // إيقاف التمرير التلقائي عند التفاعل مع الكاروسيل
  const handleInteractionStart = () => {
    setIsPaused(true);
  };

  const handleInteractionEnd = () => {
    setIsPaused(false);
  };

  // التعامل مع اللمس
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setIsDragging(true);
    handleInteractionStart();
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
      goToSlide(currentIndex + 1);
    } else if (touchEndX - touchStartX > threshold) {
      goToSlide(currentIndex - 1);
    }
    handleInteractionEnd();
  };

  // التعامل مع الماوس
  const handleMouseDown = (e) => {
    setTouchStartX(e.clientX);
    setIsDragging(true);
    handleInteractionStart();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEndX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
      goToSlide(currentIndex + 1);
    } else if (touchEndX - touchStartX > threshold) {
      goToSlide(currentIndex - 1);
    }
    handleInteractionEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      handleInteractionEnd();
    }
  };

  const getVisibleProducts = () => {
    const start = currentIndex * itemsPerView;
    const end = Math.min(start + itemsPerView, products.length);
    return products.slice(start, end);
  };

  const visibleProducts = getVisibleProducts();

  // حساب عرض المنتج بناءً على عدد المنتجات المعروضة
  const productWidth = `${100 / itemsPerView}%`;

  return (
    <div 
      className="product-carousel"
      onMouseEnter={handleInteractionStart}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div 
          className="products-row"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
          }}
        >
          {products.map((product) => (
            <div 
              key={product.id} 
              className="product-item"
              style={{ 
                width: productWidth,
                flexShrink: 0,
                padding: '0 8px',
                boxSizing: 'border-box'
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* مؤشرات التقدم */}
      {totalSlides > 1 && (
        <div className="carousel-indicators">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                handleInteractionStart();
                goToSlide(index);
                setTimeout(handleInteractionEnd, 100);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductCarousel;