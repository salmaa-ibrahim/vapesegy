// src/components/ProductCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart.js';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('ProductCard: Adding product:', product);
    
    // Add product to cart
    addToCart(product);
    
    // Show feedback
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/images/placeholder.jpg';
            }}
          />
        </div>
        
        <h3 className="product-name">{product.name}</h3>
        <p className="product-flavor">{product.flavor}</p>
        <p className="product-price">LE {product.price.toFixed(2)}</p>
      </Link>
      
      <button 
        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
        onClick={handleAddToCart}
        disabled={!product.available}
      >
        {!product.available ? 'Out of stock' : isAdded ? '✓ Added!' : 'Add to cart'}
      </button>
    </div>
  );
}

export default ProductCard;