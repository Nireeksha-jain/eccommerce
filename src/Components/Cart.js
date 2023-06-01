import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cartItems, removeFromCart, clearCart }) => {
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleCheckout = () => {
    setShowForm(true);
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form validation
    if (!name || !phone || !address) {
      setFormError(true);
      return;
    }

    // Clear form error if present
    setFormError(false);

    // Clear the cart
    clearCart();

    // Show the "Order Successful" message
    setOrderSuccess(true);

    // Reset the "Order Successful" message after 1 second
    setTimeout(() => {
      setOrderSuccess(false);
    }, 1000);

    // Close the form overlay
    setShowForm(false);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.imageUrl} alt={item.title} />
              <div className="cart-item-content">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p className="price">Total Price: ${item.quantity * item.price}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}

      {showForm && (
        <div className="form-overlay">
          <div className="form-card">
            <div className="form-header">
              <h3>Enter Your Details</h3>
              <button className="close-button" onClick={() => setShowForm(false)}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              {formError && <p>Please fill in all fields.</p>}
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {orderSuccess && (
        <div className="order-success">
          <h3>Order Successful</h3>
          <p>Your order will be delivered soon.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
