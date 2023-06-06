import React, { useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";
import Product from "../Products/Product";
import Cart from "../Cart/Cart";
import Login from "../../Login/Login";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@100&family=Comic+Neue&family=Roboto&family=Ubuntu:wght@300&display=swap');
</style>

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);

  const updateCart = (item) => {
    setCartItems((prevCartItems) => {
      let isAlreadyAvailable = false;
      prevCartItems.map((i) => {
        if (item.product_id === i.product_id) {
          i.quantity += item.quantity;
          isAlreadyAvailable = true;
        }
      });
      if (isAlreadyAvailable) return prevCartItems;
      return [...prevCartItems, item];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems(
      (prevCartItems) =>
        prevCartItems.filter((item) => item.product_id !== itemId) // Vishal
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <nav>
        <div className="content">
          <Link to="/">LOGIN</Link>
          <Link to="/products">PRODUCTS</Link>
          <NavLink to="/cart" activeClassName="active">
            <FaShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </NavLink>
        </div>
      </nav>

      <div className="content-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/products"
            element={<Product updateCart={updateCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={(id) => {
                  removeFromCart(id);
                }}
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