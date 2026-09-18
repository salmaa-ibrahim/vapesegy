// src/pages/ProductPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase.js";
import AnnouncementBar from "../components/AnnouncementBar.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import useCart from "../hooks/useCart.js";
import "./ProductPage.css";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // عشان الحركة تكون ناعمة
    });
  }, [id]); // عشان يشتغل كل مرة يتغير فيها المنتج

  useEffect(() => {
    const loadProduct = async () => {
      // 1. جلب المنتج الحالي
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single(); // هنا فقط بنستخدم single لأننا عايزين منتج واحد

      if (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } else {
        setProduct(data);

        // 2. جلب المنتجات المشابهة من نفس الكاتيجوري
        if (data.category) {
          const { data: relatedData, error: relatedError } = await supabase
            .from("products")
            .select("*")
            .eq("category", data.category) // نفس الكاتيجوري
            .neq("id", id); // استبعاد المنتج الحالي

          if (!relatedError && relatedData) {
            setRelatedProducts(relatedData); // هنا بنخزن المصفوفة كاملة
          }
        }
      }

      setLoading(false);
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-page">
        <div className="product-not-found">
          <h2>Loading product...</h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <Header />
        <div className="product-page">
          <div className="product-not-found">
            <h2>Product not found</h2>
            <Link to="/" className="back-link">
              Go Back Home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  return (
    <>
      <AnnouncementBar />
      <Header />
      <div className="product-page">
        <div className="product-page-container">
          <Link to="/" className="back-link">
            ← Back to Home
          </Link>

          <div className="product-details">
            <div className="product-details-image">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="product-details-info">
              <h1 className="product-details-name">{product.name}</h1>

              <p className="product-details-flavor">{product.flavor}</p>

              <p className="product-details-description">
                {product.description}
              </p>

              <p className="product-details-price">
                LE {Number(product.price).toFixed(2)}
              </p>

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
                {product.available ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>

          {/* ===== قسم المنتجات المشابهة ===== */}
          {relatedProducts.length > 0 && (
            <div className="related-products-section">
              <h2 className="related-products-title">You May Also Like</h2>

              <div className="related-products-grid">
                {relatedProducts.map((item) => (
                  <Link
                    to={`/product/${item.id}`}
                    key={item.id}
                    className="related-product-card"
                  >
                    <div className="related-product-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="related-product-info">
                      <h3>{item.name}</h3>
                      <p className="related-product-flavor">{item.flavor}</p>
                      <p className="related-product-price">
                        LE {Number(item.price).toFixed(2)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
