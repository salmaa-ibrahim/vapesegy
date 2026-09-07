// src/components/CategoriesSection.jsx
import React from 'react';
import CategoryCard from './CategoryCard.jsx';
import categories from '../data/categories.js';
import './CategoriesSection.css';

function CategoriesSection() {
  return (
    <section className="categories-section">
      <div className="section-header">
        <h2 className="section-title">CATEGORIES</h2>
      </div>
      
      <div className="categories-grid">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

export default CategoriesSection;