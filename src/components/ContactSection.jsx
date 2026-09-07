// src/components/ContactSection.jsx
import React from 'react';
import config from '../data/config.js';
import './ContactSection.css';
import whatsappIcon from '../../public/images/icons/whatsapp_icon.png';
import phoneIcon from '../../public/images/icons/call_icon.svg';
function ContactSection() {
  const handleWhatsApp = () => {
    const { number, message } = config.whatsapp;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handlePhone = () => {
    window.location.href = `tel:${config.phone}`;
  };

  return (
    <section className="contact-section">
      <div className="section-header">
        <h2 className="section-title">CONTACT</h2>
      </div>
      
      <div className="contact-buttons">
        <button className="contact-btn whatsapp-btn" onClick={handleWhatsApp}>
          <span className="contact-icon">
            <img src={whatsappIcon} alt="WhatsApp" />
          </span>
          WhatsApp
        </button>
        <button className="contact-btn phone-btn" onClick={handlePhone}>
          <span className="contact-icon">
            <img src={phoneIcon} alt="Phone" />
          </span>
          Phone
        </button>
      </div>
    </section>
  );
}

export default ContactSection;