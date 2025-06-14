import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // default value
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      return setError('Please fill in all fields.');
    }

    try {
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create your StayFinder account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="register-input"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="register-input"
          required
        >
          <option value="user">User</option>
          <option value="host">Host</option>
        </select>

        <button type="submit" className="register-button">Register</button>
      </form>
    </div>
  );
}
