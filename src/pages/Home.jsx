// src/pages/Home.jsx
import React from 'react';
import AnnouncementBar from '../components/AnnouncementBar.jsx';
import Header from '../components/Header.jsx';
import HeroCarousel from '../components/HeroCarousel.jsx';
import CategoriesSection from '../components/CategoriesSection.jsx';
import DeliverySection from '../components/DeliverySection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import ProductSection from '../components/ProductSection.jsx';
import Footer from '../components/Footer.jsx';
import productService from '../services/productService.js';
import './Home.css';

function Home() {
  const sections = productService.getProductSections();

  return (
    <div className="home">
      <AnnouncementBar />
      <Header />
      <HeroCarousel />
      <CategoriesSection />
      <DeliverySection />
      <ContactSection />
      
      {sections.map((section) => (
        <ProductSection key={section.id} section={section} />
      ))}
      
      <Footer />
    </div>
  );
}

export default Home;