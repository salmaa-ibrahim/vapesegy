// src/components/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterAccordion from './FooterAccordion.jsx';
import footerSections from '../data/footer.js';
import config from '../data/config.js';
import './Footer.css';
import instagramIcon from '/images/icons/instagram_icon.png';
import facebookIcon from '/images/icons/facebook_icon.png';
import whatsappIcon from '/images/icons/whatsapp_icon.png';
import phoneIcon from '/images/icons/call_icon.svg';

function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-social">
          <h3 className="footer-social-title">FOLLOW US</h3>
          <div className="social-icons">
            <a 
              href={config.social.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a 
              href={config.social.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Facebook"
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a 
              href={config.social.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="WhatsApp"
            >
              <img src={whatsappIcon} alt="WhatsApp" />
            </a>
            <a 
              href={config.social.phone} 
              className="social-icon"
              aria-label="Phone"
            >
              <img src={phoneIcon} alt="Phone" />
            </a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-accordions">
          {footerSections.map((section) => (
            <FooterAccordion
              key={section.id}
              section={section}
              isOpen={openSection === section.id}
              onToggle={() => toggleSection(section.id)}
            />
          ))}
        </div>

        <div className="footer-divider"></div>

        <div className="footer-brand">
          <p className="footer-brand-text">@vapesegy-copyright saved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;