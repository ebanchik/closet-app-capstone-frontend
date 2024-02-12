import React, { useState } from 'react';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      // Redirect to a protected page or show a success message
      alert('Login successful!');
    } catch (error) {
      console.error('Error during login:', error);
      // Show an error message to the user
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Remove the JWT token from local storage
      localStorage.removeItem('token');

      // Redirect to the login page or show a success message
      alert('Logout successful!');
    } catch (error) {
      console.error('Error during logout:', error);
      // Show an error message to the user
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <div className='login-form'>
      <h1>Login</h1>
      <form id="loginForm">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleLogin}>Login</button>
        <button type="button" onClick={handleLogout}>Logout</button>
      </form>
    </div>
  );
};

export default LoginForm;
