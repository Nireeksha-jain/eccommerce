import React, { useState } from 'react';
import { Link, NavLink, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import './Navbar.css';
import Product from './Product';
import Cart from './Cart';
import Login from './Login';

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);

  const updateCart = (item) => {
    setCartItems((prevCartItems) => [...prevCartItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <nav>
        <div className="content">
          <Link to="/login">LOGIN</Link>
          <Link to="/">PRODUCTS</Link>
          <NavLink to="/cart" activeClassName="active">
            <FaShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </NavLink>
        </div>
      </nav>

      <div className="content-container">
        <Routes>
          <Route path="/login" element={<Login />} />
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
                clearCart={clearCart}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default Navbar;
