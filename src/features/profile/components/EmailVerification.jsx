import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../profileSlice';
import { updateUser } from '../../auth/authSlice';
import Button from '../../../components/common/Button';

const EmailVerification = ({email}) => {
  const [step, setStep] = useState(0)
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);


  useEffect(() => {
    if (status == "email-verified") {
      dispatch(updateUser({ isEmailVerified: true }));
    }
  }, [status]);

  const handleVerify = () => {
    if (step == 0) {
      dispatch(verifyEmail('send'));
      setResendCooldown(60);
      setStep(1);
    } else if (step == 1) {
      dispatch(verifyEmail(otp));
    }
  };

  const handleSendAgain = () => {
    if (resendCooldown === 0) {
      dispatch(verifyEmail('send'));
      setResendCooldown(60); // Set cooldown to 60 seconds
    }
  };

  return (
    <div>
      <Button onClick={handleVerify}>Verify Email</Button>
    {step > 0 && <Button onClick={handleSendAgain} disabled={resendCooldown > 0}>
      <input type="text" placeholder="Confirmation code" value={otp} onChange={(e) => setOtp(e.target.value)} />
        {resendCooldown > 0 && step > 0 ? `Resend in ${resendCooldown}s` : 'Send code again'}
      </Button>}
      {status === 'email-verified' && <p>Email verified successfully!</p>}
      {status === 'email-verification-sent' && <p>Please check your email for confirmation code</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default EmailVerification;

