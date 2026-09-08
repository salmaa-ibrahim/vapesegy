// // src/components/ProductSection.jsx
// import React from 'react';
// import ProductCarousel from './ProductCarousel.jsx';
// import productService from '../services/productService.js';
// import './ProductSection.css';

// function ProductSection({ section }) {
//   const products = productService.getProductsForSection(section.id);

//   return (
//     <section className="product-section">
//       <div className="section-header">
//         <h2 className="section-title">{section.title}</h2>
//       </div>
      
//       {section.banner && (
//         <div className="product-banner">
//           <img 
//             src={section.banner} 
//             alt={section.title}
//             className="banner-image"
//             loading="lazy"
//           />
//         </div>
//       )}
      
//       <ProductCarousel products={products} />
//     </section>
//   );
// }

// export default ProductSection;



// src/components/ProductSection.jsx
import React, { useEffect, useState } from 'react';
import ProductCarousel from './ProductCarousel.jsx';
import productService from '../services/productService.js';
import categoryService from '../services/categoryService.js';
import './ProductSection.css';

function ProductSection({ section }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await productService.fetchProducts();

      const category = categoryService.getCategoryById(section.categoryId);

      if (!category) {
        setProducts([]);
        return;
      }

      const sectionProducts = allProducts.filter(
        product =>
          product.category.toLowerCase() === category.name.toLowerCase()
      );

      setProducts(sectionProducts);
    };

    loadProducts();
  }, [section]);

  return (
    <section className="product-section">
      <div className="section-header">
        <h2 className="section-title">{section.title}</h2>
      </div>

      {section.banner && (
        <div className="product-banner">
          <img
            src={section.banner}
            alt={section.title}
            className="banner-image"
            loading="lazy"
          />
        </div>
      )}

      <ProductCarousel products={products} />
    </section>
  );
}

export default ProductSection;