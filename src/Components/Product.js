import React, { useState, useEffect } from 'react';
import './Product.css';
import { FaTh, FaList } from 'react-icons/fa';

const Product = ({ updateCart }) => {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    fetch('http://localhost:8089/api/products/')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const addToCart = (item) => {
    if (!selectedQuantity || selectedQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
  
    if (selectedQuantity > item.quantity_available) {
      alert(`Quantity available is only ${item.quantity_available}`);
      return;
    }
  
    const updatedItem = {
      ...item,
      quantity: selectedQuantity,
    };
  
    updateCart(updatedItem);
    setSelectedProduct(null);
    setSelectedQuantity(1); // Reset the selected quantity to 1 after adding to cart
  };
  

  // const removeFromCart = (item) => {
  //   if (item.quantity > 0) {
  //     const updatedItem = {
  //       ...item,
  //       quantity: item.quantity - 1,
  //     };
  //     updateCart(updatedItem);
  //   }
  // };

  const toggleView = () => {
    setView(view === 'grid' ? 'list' : 'grid');
  };

  const changeItemsPerPage = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };
  

  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
  };

  return (
    <div>
      <div className="view-icons">
        <FaTh
          className={`view-icon ${view === 'grid' ? 'active' : ''}`}
          onClick={() => setView('grid')}
        />
        <FaList
          className={`view-icon ${view === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
        />
      </div>
      <div className={view === 'grid' ? 'grid-view' : 'list-view'}>
        {currentItems.map((product) => (
          <div className={`product ${view === 'list' ? 'list-layout' : ''}`} key={product.product_id}>
            {view === 'list' && (
              <div className="product-image-container">
                <img className="product-image" src={product.image_url} alt={product.name} />
              </div>
            )}
            <div className="product-details">
              {view === 'grid' && (
                <div className="product-image-container">
                  <img className="product-image" src={product.image_url} alt={product.name} />
                </div>
              )}
              <div className="product-info">
                <h2>{product.name}</h2>
                <p> ₹{product.price}</p>
                {view === 'list' && <p>Quantity available: {product.quantity_available}</p>}
              </div>
              <div className="product-actions">
                {selectedProduct && selectedProduct.product_id === product.product_id ? (
                  <div className="quantity-container">
                    <input
                      type="number"
                      min="1"
                      value={selectedQuantity}
                      onChange={handleQuantityChange}
                    />
                    <button className="add-to-cart-button" onClick={() => addToCart(selectedProduct)}>
                    Add to Cart
                    </button>

                  </div>
                ) : (
                  <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <div className="page">
          <button onClick={() => changeItemsPerPage(10)}>10 per page</button>
          <button onClick={() => changeItemsPerPage(20)}>20 per page</button>
        </div>
        <div className="next"> 
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
