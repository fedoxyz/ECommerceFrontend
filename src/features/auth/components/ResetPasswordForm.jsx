import React, { useState } from 'react';
import apiService from '../../../services/api';
import Button from '../../../components/common/Button';

const ResetPasswordForm = ({onResetPasswordSuccess, footer}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const [step, setStep] = useState(1); // Step 1: Request OTP, Step 2: Enter OTP & Password
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await apiService.post('/auth/reset-password', { email: formData.email, otp: 'send', password: 'default' });
      setMessage('OTP sent to your email. Check your inbox.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await apiService.post('/auth/reset-password', {
        email: formData.email,
        password: formData.password,
        otp: formData.otp,
      });

      setMessage('Password reset successfully! You can now log in.');
      onResetPasswordSuccess(formData.email)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div>
      <h2>Reset password</h2>
      {message && <p className="success">{message}</p>}
      {step === 1 ? (
        <form onSubmit={handleRequestOtp}>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <Button type="submit">Request code</Button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div>
            <label>OTP</label>
            <input type="text" name="otp" value={formData.otp} onChange={handleChange} required />
          </div>
          <div>
            <label>New Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
          </div>
          <Button type="submit">Reset Password</Button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
      {footer && <div>{footer}</div>}
    </div>
  );
};

export default ResetPasswordForm;

