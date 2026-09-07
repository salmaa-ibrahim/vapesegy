// src/pages/ProductPage.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import productService from '../services/productService.js';
import useCart from '../hooks/useCart.js';
import './ProductPage.css';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = productService.getProductById(id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="product-page">
        <div className="product-not-found">
          <h2>Product not found</h2>
          <Link to="/" className="back-link">Go Back Home</Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-page">
      <div className="product-page-container">
        <Link to="/" className="back-link">← Back to Home</Link>
        
        <div className="product-details">
          <div className="product-details-image">
            <img src={product.image} alt={product.name} />
          </div>
          
          <div className="product-details-info">
            <h1 className="product-details-name">{product.name}</h1>
            <p className="product-details-flavor">{product.flavor}</p>
            <p className="product-details-description">{product.description}</p>
            <p className="product-details-price">LE {product.price.toFixed(2)}</p>
            
            <div className="product-details-quantity">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="qty-btn"
                  onClick={() => handleQuantityChange(quantity - 1)}
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => handleQuantityChange(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!product.available}
            >
              {product.available ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;