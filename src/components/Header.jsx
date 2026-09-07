// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartDrawer from './CartDrawer.jsx';
import useCart from '../hooks/useCart.js';
import './Header.css';
import vapesegylogo from '../../public/images/logo/vapesegylogo0.png';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount } = useCart();
//   const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <Link to="/" className="logo">
            {/* <span className="logo-icon">🌫️</span> */}
            {/* <span className="logo-text">Vapesegy</span> */}
            <img className="logo-image" src={vapesegylogo} alt="Vapesegy Logo" />
          </Link>

          <button className="cart-btn" onClick={openCart} aria-label="Cart">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}>
        <nav className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} onClick={e => e.stopPropagation()}>
          <div className="menu-header">
            <span className="menu-logo">Vapesegy</span>
            <button className="menu-close" onClick={closeMenu}>✕</button>
          </div>
          <ul className="menu-items">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><Link to="/menu" onClick={closeMenu}>All Products</Link></li>
            <li className="menu-categories-title">Categories</li>
            <li><Link to="/category/vozol-gear" onClick={closeMenu}>Vozol Gear 50k</Link></li>
            <li><Link to="/category/vozol-star" onClick={closeMenu}>Vozol Star 40k</Link></li>
            <li><Link to="/category/aivono-zero" onClick={closeMenu}>Aivono Zero Nicotine</Link></li>
            <li><Link to="/category/the-crystal" onClick={closeMenu}>THE CRYSTAL</Link></li>
            <li><Link to="/category/elfbar" onClick={closeMenu}>ELFBAR</Link></li>
            <li><Link to="/cart" onClick={closeMenu}>Cart</Link></li>
            <li><Link to="/checkout" onClick={closeMenu}>Checkout</Link></li>
          </ul>
        </nav>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}

export default Header;