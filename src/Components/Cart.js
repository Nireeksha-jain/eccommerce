import React, { useState, useEffect } from "react";
import "./Cart.css";
import { IconContext } from "react-icons";

const Cart = ({ cartItems, clearCart, removeFromCart }) => {
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(false);
  const [orderStatus, setOrderStatus] = useState(1);
  const [name, setName] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [cartItemsWithImageUrl, setCartItemsWithImageUrl] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [redirectToProducts, setRedirectToProducts] = useState(false);

  useEffect(() => {
    fetchImageUrls();
  }, []);

  const fetchImageUrls = async () => {
    const updatedCartItems = await Promise.all(
      cartItems.map(async (item) => {
        try {
          const response = await fetch(
            `http://localhost:8089/api/products/${item.product_id}/image`
          );
          if (response.ok) {
            const imageUrl = await response.text();
            const price = parseFloat(item.price); // Convert price to a number
            return { ...item, imageUrl, price };
          } else {
            console.error("Error fetching image:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching image:", error.message);
        }
        return item;
      })
    );

    setCartItemsWithImageUrl(updatedCartItems);
  };

  const handleCheckout = () => {
    setShowForm(true);
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItemsWithImageUrl((prevData) =>
      prevData.filter((items) => items.product_id !== itemId)
    );
    removeFromCart(itemId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobileNumber || !address) {
      setFormError(true);
      return;
    }

    setFormError(false);

    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    const order = {
      name,
      mobileNumber,
      address,
      orderStatus,
      totalPrice,
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
    };
    setCartItemsWithImageUrl([]);
    clearCart();
    setShowForm(false);
    try {
      const response = await fetch("http://localhost:8089/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      
      if (response.ok) {
       

        // Delay showing the "Order Successful" message to allow time for clearing the cart
        setTimeout(() => {
          setOrderSuccess(true);
        }, 500);

        setTimeout(() => {
          setOrderSuccess(false);
          setShowForm(false);
          setRedirectToProducts(true);
        }, 1500);
      } else {
        console.error("Error creating order:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItemsWithImageUrl.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItemsWithImageUrl.map((item) => (
            <div className="cart-item" key={item.product_id}>
              <img src={item.imageUrl} alt={item.name} />
              <div className="cart-item-content">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.quantity * item.price}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => handleRemoveFromCart(item.product_id)}>
                  Remove
                </button>
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
              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                X
              </button>
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
                value={mobileNumber}
                onChange={(e) => setmobileNumber(e.target.value)}
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
        </div>
      )}
    </div>
  );
};

export default Cart;