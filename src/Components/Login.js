import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the API call here
    fetch(`http://localhost:8089/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('User logged in successfully');
          // Redirect to the products page
          window.location.href = '/products';
        } else {
          console.log('Login failed');
        }
      })
      .catch((error) => {
        console.error('Error occurred during login:', error);
      });
  };

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item">
          <img src="https://picsum.photos/id/456/1200/600" className="d-block w-100" alt="..." />
        </div>
      </div>
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="card-body">
          <h1 className="card-title">LOGIN</h1>
        </div>
        <div className="name">
          <label htmlFor="name" className="form-label">Name</label>
          <br />
          <input type="text" className="form-control" id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="email">
          <label htmlFor="email" className="form-label">Email</label>
          <br />
          <input type="email" className="form-control" id="email" placeholder="johndoe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="btn btn-primary" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
