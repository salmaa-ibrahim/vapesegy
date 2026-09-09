// import { useEffect, useRef, useState } from 'react';
// import ProductCard from './ProductCard.jsx';
// import './ProductCarousel.css';

// function ProductCarousel({ products = [] }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsPerView, setItemsPerView] = useState(5);
//   const [isPaused, setIsPaused] = useState(false);

//   const startX = useRef(0);
//   const isDragging = useRef(false);
//   const didDrag = useRef(false);

//   useEffect(() => {
//     const updateItemsPerView = () => {
//       const width = window.innerWidth;
//       setItemsPerView(width >= 1200 ? 5 : width >= 992 ? 4 : width >= 768 ? 3 : 2);
//     };

//     updateItemsPerView();
//     window.addEventListener('resize', updateItemsPerView);

//     return () => window.removeEventListener('resize', updateItemsPerView);
//   }, []);

//   const totalSlides = Math.ceil(products.length / itemsPerView);
//   const maxIndex = Math.max(0, totalSlides - 1);

//   useEffect(() => {
//     setCurrentIndex((index) => Math.min(index, maxIndex));
//   }, [maxIndex]);

//   const goToSlide = (index) => {
//     setCurrentIndex(() => {
//       if (index < 0) return maxIndex;
//       if (index > maxIndex) return 0;
//       return index;
//     });
//   };

//   useEffect(() => {
//     if (isPaused || maxIndex === 0) return undefined;

//     const timer = window.setInterval(() => {
//       setCurrentIndex((index) => (index >= maxIndex ? 0 : index + 1));
//     }, 3500);

//     return () => window.clearInterval(timer);
//   }, [isPaused, maxIndex]);

//   const isInteractiveElement = (element) =>
//     element.closest('button, a, input, select, textarea, label');

//   const handlePointerDown = (event) => {
//     // لا نتعامل مع زر الإضافة أو الروابط كسحب.
//     if (isInteractiveElement(event.target)) return;

//     startX.current = event.clientX;
//     isDragging.current = true;
//     didDrag.current = false;
//     setIsPaused(true);
//     event.currentTarget.setPointerCapture?.(event.pointerId);
//   };

//   const handlePointerMove = (event) => {
//     if (!isDragging.current) return;

//     if (Math.abs(event.clientX - startX.current) > 8) {
//       didDrag.current = true;
//     }
//   };

//   const handlePointerUp = (event) => {
//     if (!isDragging.current) return;

//     const distance = event.clientX - startX.current;
//     isDragging.current = false;
//     setIsPaused(false);

//     if (Math.abs(distance) > 50) {
//       goToSlide(distance < 0 ? currentIndex + 1 : currentIndex - 1);
//     }
//   };

//   if (!products.length) return null;

//   return (
//     <div
//       className="product-carousel"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => {
//         isDragging.current = false;
//         setIsPaused(false);
//       }}
//     >
//       <div
//         className="carousel-viewport"
//         onPointerDown={handlePointerDown}
//         onPointerMove={handlePointerMove}
//         onPointerUp={handlePointerUp}
//         onPointerCancel={() => {
//           isDragging.current = false;
//           setIsPaused(false);
//         }}
//       >
//         <div
//           className="products-row"
//           style={{
//             transform: `translateX(-${currentIndex * 100}%)`,
//           }}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="product-item"
//               style={{ width: `${100 / itemsPerView}%` }}
//             >
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {totalSlides > 1 && (
//         <div className="carousel-indicators">
//           {Array.from({ length: totalSlides }, (_, index) => (
//             <button
//               key={index}
//               type="button"
//               className={`indicator ${index === currentIndex ? 'active' : ''}`}
//               onClick={() => goToSlide(index)}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductCarousel;



// // src/components/ProductCarousel.jsx
// import { useEffect, useRef, useState } from 'react';
// import ProductCard from './ProductCard.jsx';
// import './ProductCarousel.css';

// function ProductCarousel({ products = [] }) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [itemsPerView, setItemsPerView] = useState(5);

//   const startX = useRef(0);
//   const isDragging = useRef(false);

//   useEffect(() => {
//     const updateItemsPerView = () => {
//       const width = window.innerWidth;

//       if (width >= 1200) setItemsPerView(5);
//       else if (width >= 992) setItemsPerView(4);
//       else if (width >= 768) setItemsPerView(3);
//       else setItemsPerView(2);
//     };

//     updateItemsPerView();
//     window.addEventListener('resize', updateItemsPerView);

//     return () => window.removeEventListener('resize', updateItemsPerView);
//   }, []);

//   const totalSlides = Math.ceil(products.length / itemsPerView);
//   const maxIndex = Math.max(0, totalSlides - 1);

//   useEffect(() => {
//     setCurrentIndex((index) => Math.min(index, maxIndex));
//   }, [maxIndex]);

//   const goToSlide = (index) => {
//     setCurrentIndex(() => {
//       if (index < 0) return maxIndex;
//       if (index > maxIndex) return 0;
//       return index;
//     });
//   };

//   // تمرير تلقائي كل 3 ثوانٍ
//   useEffect(() => {
//     if (maxIndex === 0) return undefined;

//     const timer = window.setInterval(() => {
//       setCurrentIndex((index) => (index >= maxIndex ? 0 : index + 1));
//     }, 3000);

//     return () => window.clearInterval(timer);
//   }, [maxIndex]);

//   const isInteractiveElement = (element) => {
//     return element.closest('button, a, input, select, textarea, label');
//   };

//   const handlePointerDown = (event) => {
//     // لا نبدأ السحب عند الضغط على زر الإضافة أو أي عنصر تفاعلي.
//     if (isInteractiveElement(event.target)) return;

//     startX.current = event.clientX;
//     isDragging.current = true;

//     event.currentTarget.setPointerCapture?.(event.pointerId);
//   };

//   const handlePointerUp = (event) => {
//     if (!isDragging.current) return;

//     const distance = event.clientX - startX.current;
//     isDragging.current = false;

//     if (Math.abs(distance) < 50) return;

//     if (distance < 0) {
//       goToSlide(currentIndex + 1);
//     } else {
//       goToSlide(currentIndex - 1);
//     }
//   };

//   const handlePointerCancel = () => {
//     isDragging.current = false;
//   };

//   if (!products.length) return null;

//   return (
//     <div className="product-carousel">
//       <div
//         className="carousel-viewport"
//         onPointerDown={handlePointerDown}
//         onPointerUp={handlePointerUp}
//         onPointerCancel={handlePointerCancel}
//       >
//         <div
//           className="products-row"
//           style={{
//             transform: `translateX(-${currentIndex * 100}%)`,
//           }}
//         >
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="product-item"
//               style={{ width: `${100 / itemsPerView}%` }}
//             >
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {totalSlides > 1 && (
//         <div className="carousel-indicators">
//           {Array.from({ length: totalSlides }, (_, index) => (
//             <button
//               key={index}
//               type="button"
//               className={`indicator ${index === currentIndex ? 'active' : ''}`}
//               onClick={() => goToSlide(index)}
//               aria-label={`الانتقال إلى المجموعة ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductCarousel;


import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard.jsx';
import './ProductCarousel.css';

function ProductCarousel({ products = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  const startX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;

      if (width >= 1200) setItemsPerView(5);
      else if (width >= 992) setItemsPerView(4);
      else if (width >= 768) setItemsPerView(3);
      else setItemsPerView(2);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);

    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(products.length / itemsPerView);
  const maxIndex = Math.max(0, totalSlides - 1);

  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, maxIndex));
  }, [maxIndex]);

  const goToSlide = (index) => {
    setCurrentIndex(() => {
      if (index < 0) return maxIndex;
      if (index > maxIndex) return 0;
      return index;
    });
  };

  // التحريك التلقائي كل 3 ثوانٍ
  useEffect(() => {
    if (maxIndex === 0) return undefined;

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index >= maxIndex ? 0 : index + 1));
    }, 3000);

    return () => window.clearInterval(timer);
  }, [maxIndex]);

  const handlePointerDown = (event) => {
    startX.current = event.clientX;
    isDragging.current = true;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handlePointerUp = (event) => {
    if (!isDragging.current) return;

    const distance = event.clientX - startX.current;
    isDragging.current = false;

    if (Math.abs(distance) < 50) return;

    if (distance < 0) {
      goToSlide(currentIndex + 1); // سحب لليسار
    } else {
      goToSlide(currentIndex - 1); // سحب لليمين
    }
  };

  if (!products.length) return null;

  return (
    <div className="product-carousel">
      <div
        className="carousel-viewport"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          isDragging.current = false;
        }}
      >
        <div
          className="products-row"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="product-item"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {totalSlides > 1 && (
        <div className="carousel-indicators" aria-hidden="true">
          {Array.from({ length: totalSlides }, (_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductCarousel;