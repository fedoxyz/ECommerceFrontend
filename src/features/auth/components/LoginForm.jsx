import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, processLogin } from '../authSlice';
import Button from '../../../components/common/Button';

const LoginForm = ({ onLoginSuccess, footer }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: 'none', 
  });


  const dispatch = useDispatch();
  
  const { user, isAuthenticated, status, message, otp } = useSelector(
    (state) => state.auth
  );

  
  const displayOtpValue = otp.required && formData.otp === 'none' ? '' : formData.otp;

  const [error, setError] = useState('');

  // Reset error when component mounts
  useEffect(() => {
    console.log("useEffect status")
    console.log(status, user)
    if (status === "failed") {
      setError(message);
    } else if (status === "succeeded" && user) {
      console.log("status succeeded")
      if (onLoginSuccess) {
        console.log("if on login success")
        onLoginSuccess(user);
      }
      dispatch(processLogin());
    }
  }, [status, user]);

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
          <Button type="submit">Submit code</Button>
          {otp.message && <p>{otp.message}</p>}
        </div>
      )}
      
      {error && <p className="error">{error}</p>}
      {!otp.required && <Button type="submit">Login</Button>}
    </form>
  );
};

export default LoginForm;
