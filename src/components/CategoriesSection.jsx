// src/components/CategoriesSection.jsx
import React from "react";
import CategoryCard from "./CategoryCard.jsx";
import categories from "../data/categories.js";
import "./CategoriesSection.css";

function CategoriesSection() {
  return (
    <section className="categories-section">
      {/* <div className="section-header">
        <h2 className="section-title">CATEGORIES</h2>
      </div> */}

      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h3 className="animate-charcter"> CATEGORIES</h3>
          </div>
        </div>
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
