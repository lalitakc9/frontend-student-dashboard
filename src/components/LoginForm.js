import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import axios from '../api/axios';

function LoginForm() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });

    setIsButtonDisabled(!(loginData.username && loginData.password));
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    if (!loginData.username || !loginData.password) {
      alert('Username and password are required');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8081/v1/api/users/login', loginData);
      
      if (response.data && loginData.username === response.data.username) {
        localStorage.setItem('username', loginData.username);
        alert("Student Login Success");
        navigate('/dashboard');
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      alert("Student Login Failed");
    }
  };  

  return (
    <section className="login-section">
      <p className='login-p'>Login With Your Credential</p>

      <div className="login-form">
        <h2>Student Login</h2>
        <form>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleLoginChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
          />
          <button type="submit" onClick={handleLoginSubmit} disabled={isButtonDisabled}>
            Login
          </button>
        </form>
        <p>
          <Link to="/register">Not Registered?</Link> | <Link to="/forgot-password">Forgot Password</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginForm;
