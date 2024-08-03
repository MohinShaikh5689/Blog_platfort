import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', { username, password }, {
        withCredentials: true
      });

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        setUsername('');
        setPassword('');
        navigate('/'); // Redirect to home page after successful login
      } else {
        console.error('Token not found in response');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Optionally, handle errors such as displaying a message to the user
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
