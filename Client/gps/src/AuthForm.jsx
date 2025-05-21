import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const AuthForm = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await axios.post('https://gps-tracks-1.onrender.com/auth/login', form);
        localStorage.setItem('token', res.data.token);
        onAuth();
      } else {
        await axios.post('https://gps-tracks-1.onrender.com/auth/signup', form);
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-box">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <span onClick={toggleMode} className="toggle">{isLogin ? 'Sign Up' : 'Login'}</span>
      </p>
    </div>
  );
};

export default AuthForm;
