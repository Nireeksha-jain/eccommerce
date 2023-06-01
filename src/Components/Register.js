// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Register.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const navigate = useNavigate();

//   const isFormValid = () => {
//     return name && phone && password && confirmPassword;
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     // Perform registration logic here
//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
//     // Registration successful, navigate to login page
//     alert('Registration successful');
//     navigate('/login');
//   };

//   return (
//     <div className="register-page">
//       <div className="register-background" />

//       <div className="register-card">
//         <h1>Register</h1>
//         <form onSubmit={handleRegister}>
//           <div className="input-group">
//             <label htmlFor="name">Name:</label>
//             <br />
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="phone">Phone Number:</label>
//             <br />
//             <input
//               type="text"
//               id="phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password:</label>
//             <br />
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="confirmPassword">Confirm Password:</label>
//             <br />
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit" disabled={!isFormValid()}>
//             Register
//           </button>
//         </form>
//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
