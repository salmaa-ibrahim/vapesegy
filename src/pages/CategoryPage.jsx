// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AnnouncementBar from "../components/AnnouncementBar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import categoryService from "../services/categoryService.js";
import productService from "../services/productService.js";
import ProductCard from "../components/ProductCard.jsx";
import "./CategoryPage.css";

function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  const category = categoryService.getCategoryBySlug(slug);

  useEffect(() => {
    const loadProducts = async () => {
      const allProducts = await productService.fetchProducts();

      const categoryProducts = allProducts.filter(
        (product) =>
        product.category.trim().toLowerCase() ===
          category.name.trim().toLowerCase(),
      );

      setProducts(categoryProducts);
    };

    if (category) {
      loadProducts();
    }
  }, [category]);

  if (!category) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <div className="category-page">
          <div className="category-not-found">
            <h2>Category not found</h2>
            <Link to="/" className="back-link">
              Go Back Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="category-page">
        <div className="category-page-container">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>

          <div className="category-header">
            <h1 className="category-title">{category.name}</h1>
            <p className="category-flavor">{category.flavor}</p>
            <p className="category-count">{products.length} products</p>
          </div>

          {products.length === 0 ? (
            <div className="no-products">
              <p>No products found in this category.</p>
            </div>
          ) : (
            <div className="category-products">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
