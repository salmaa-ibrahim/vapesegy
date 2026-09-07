// src/components/DeliverySection.jsx
import React from 'react';
import './DeliverySection.css';

function DeliverySection() {
  return (
    <section className="delivery-section">
      <div className="section-header">
        <h2 className="section-title">DELIVERY</h2>
      </div>
      
      <div className="delivery-content">
        <img 
          src="/images/banners/delivery-banner.jpg" 
          alt="Same day delivery in Cairo"
          className="delivery-image"
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default DeliverySection;