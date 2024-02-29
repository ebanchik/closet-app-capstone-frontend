import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignupForm: React.FC = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      // Log the current state values
      console.log('Email:', email);
      console.log('Password:', password);
  
      // Create a FormData object and append the email and password
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
  
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        body: formData, // Send the form data
      });
  
      // Log the response status and headers
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
  
      if (!response.ok) {
        // Log the response body for more details
        const responseBody = await response.text();
        console.log('Response body:', responseBody);
  
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      // Log the response data
      console.log('Response data:', data);
  
      // Redirect to the login page ("/login")
      navigate('/login');
  
      // Show a success message
      setMessage('Signup successful!');
    } catch (error) {
      // Log the error details
      console.error('Error during signup:', error);
  
      // Show an error message to the user
      setMessage('Signup failed. Please check your details.');
    }
  };
  
  
  

  return (
    <div className='signup-form'>
      <h1 className='signup-text'>SIGNUP</h1>
      {message && <p className="message">{message}</p>}
      <form id="signupForm">
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
              className="form-control custom-signup-input
              custom-signup-input" // Bootstrap class
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
              className="form-control custom-signup-input" // Bootstrap class
            />
          </div>
          <button type="button" onClick={handleSignup} className="btn btn-primary">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
