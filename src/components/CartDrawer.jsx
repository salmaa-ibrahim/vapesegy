// src/components/CartDrawer.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart.js";
import "./CartDrawer.css";

function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const shippingFee = 100;
  const orderTotal = cartTotal + shippingFee;

  // Log cart changes for debugging
  useEffect(() => {
    if (isOpen) {
      console.log("CartDrawer: Cart updated:", cart);
    }
  }, [cart, isOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
  };

  return (
    <div
      className={`cart-drawer-overlay ${isOpen ? "active" : ""}`}
      onClick={onClose}
    >
      <div
        className={`cart-drawer ${isOpen ? "active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-drawer-header">
          <h2 className="cart-drawer-title">Your Cart</h2>
          <button
            className="cart-drawer-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-drawer-empty">
            <div className="empty-cart-icon">🛒</div>
            <p>Your cart is empty</p>
            <button className="continue-shopping-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-drawer-item">
                  <div className="drawer-item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = "/images/placeholder.jpg";
                      }}
                    />
                  </div>

                  <div className="drawer-item-details">
                    <h4 className="drawer-item-name">{item.name}</h4>
                    <p className="cart-item-flavor">{item.flavor}</p>{" "}
                    <p className="drawer-item-price">
                      LE {item.price.toFixed(2)}
                    </p>
                    <div className="drawer-item-actions">
                      <div className="drawer-quantity-controls">
                        <button
                          className="drawer-qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </button>
                        <span className="drawer-qty-value">
                          {item.quantity}
                        </span>
                        <button
                          className="drawer-qty-btn"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="drawer-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="drawer-total">
                <span className="drawer-total-label">Shipping:</span>
                <span className="drawer-total-price">
                  LE {shippingFee.toFixed(2)}
                </span>
              </div>
              <div className="drawer-total">
                <span className="drawer-total-label">Total:</span>
                <span className="drawer-total-price">
                  LE {orderTotal.toFixed(2)}
                </span>
              </div>

              {/* <Link 
                to="/cart" 
                className="drawer-view-cart-btn"
                onClick={onClose}
              >
                View Full Cart
              </Link> */}

              <Link
                to="/checkout"
                className="drawer-checkout-btn"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
