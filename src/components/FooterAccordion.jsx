// src/components/FooterAccordion.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './FooterAccordion.css';

function FooterAccordion({ section, isOpen, onToggle }) {
  const isExternalLink = (link) => {
    return link.startsWith('http') || link.startsWith('tel:') || link.startsWith('mailto:');
  };

  return (
    <div className="footer-accordion">
      <button className="accordion-header" onClick={onToggle}>
        <span className="accordion-title">{section.title}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      
      {isOpen && (
        <ul className="accordion-content">
          {section.items.map((item, index) => (
            <li key={index} className="accordion-item">
              {isExternalLink(item.link) ? (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="accordion-link"
                >
                  {item.label}
                </a>
              ) : (
                <Link to={item.link} className="accordion-link">
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FooterAccordion;