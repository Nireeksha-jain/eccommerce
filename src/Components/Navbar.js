import React, { useState } from 'react';
import { Link, NavLink, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';
import Product from './Product';
import Cart from './Cart';

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);

  const updateCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <nav>
        <div className="content">
          <Link to="/">PRODUCTS</Link>
          <NavLink to="/cart" activeClassName="active">
            <FaShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </NavLink>
        </div>
      </nav>

      <div className="content-container">
        <Routes>
          <Route
            path="/"
            element={<Product updateCart={updateCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                clearCart={clearCart} // Pass clearCart function to Cart component
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Navbar;
