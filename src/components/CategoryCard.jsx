// src/components/CategoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

function CategoryCard({ category }) {
  return (
    <Link to={`/category/${category.slug}`} className="category-card">
      <div className="category-image-container">
        <img 
          src={category.image} 
          alt={category.name}
          className="category-image"
          loading="lazy"
        />
      </div>
      <p className="category-name">{category.name}</p>
    </Link>
  );
}

export default CategoryCard;