import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../authSlice';

const LoginForm = ({ onLoginSuccess, footer }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: 'none', 
  });


  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user, status, message, otp } = useSelector(
    (state) => state.auth
  );
  
  const displayOtpValue = otp.required && formData.otp === 'none' ? '' : formData.otp;

  const [error, setError] = useState('');

  // Reset error when component mounts
  useEffect(() => {
    if (status === "failed") {
      setError(message);
    } else if (status === "succeeded" && user) {
      if (onLoginSuccess) {
        onLoginSuccess(user);
        navigate('/');
      }
    }
  }, [user, status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    // We'll use the same login action but now with OTP included
    dispatch(login(formData));
  };
  
  if (status == "loading") {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={otp.required ? handleOtpSubmit : handleSubmit}>
      <h2>Login</h2>
      {!otp.required && (
        <>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        {footer && <div>{footer}</div>}
        </>
      )}
      
      {otp.required && (
        <div>
          <label htmlFor="otp">Confirmation code</label>
          <input
            type="text"
            id="otp"
            name="otp"
            value={displayOtpValue}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit code</button>
          {otp.message && <p>{otp.message}</p>}
        </div>
      )}
      
      {error && <p className="error">{error}</p>}
      {!otp.required && <button type="submit">Login</button>}
    </form>
  );
};

export default LoginForm;
