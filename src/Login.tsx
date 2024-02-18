import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Store the JWT token in local storage
      localStorage.setItem('token', data.token);

      // Redirect to the homepage ("/")
      navigate('/');

      // Show a success message
      setMessage('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      // Show an error message to the user
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='login-form'>
      <h1 className='login-text'>LOGIN</h1>
      {message && <p className="message">{message}</p>}
      <form id="loginForm">
        <div className="form-container"> {/* Apply the CSS class here */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control custom-input-color" // Bootstrap class
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control custom-input-color" // Bootstrap class
            />
          </div>
          <button type="button" onClick={handleLogin} className="btn btn-primary custom-login-button">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
