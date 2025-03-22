import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeEmail } from '../profileSlice';
import { updateUser } from '../../auth/authSlice';

  const ChangeEmail = () => {
    const [newEmail, setNewEmail] = useState('');
    const [oldEmailOtp, setOldEmailOtp] = useState('');
    const [newEmailOtp, setNewEmailOtp] = useState('');
    const [step, setStep] = useState(0);
    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.profile);
  
    useEffect(() => {
      if (status == "email-changed") {
        dispatch(updateUser({ email: newEmail }));
      }
    }, [status]);
  
  const handleChangeEmail = () => {
    switch (step) {
      case 0: // Initial step
        setStep(1);
        break;
  
      case 1: // OTP sending step
        dispatch(changeEmail({ newEmail, otps: "send" }))
          .then((response) => {
            // Check if the response is successful
            console.log(response);
            if (response.payload?.response?.status === 'success') {
              setStep(2); // Only move to next step if no error
            } else {
              console.error('Failed to send OTP:', response.payload);
              // Optionally, show a UI error message
            }
          })
          .catch((error) => {
            console.error('Error sending OTP:', error);
            // Optionally, show a UI error message
          });
        break;
  
      case 2: // OTP verification step
        const combinedOtps = `${oldEmailOtp}-${newEmailOtp}`;
        dispatch(changeEmail({ newEmail, otps: combinedOtps }))
          .then((response) => {
            // Check if the response is successful
            if (response.payload?.response?.status === 'success') {
              console.log('Email changed successfully');
              setStep(0);
            } else {
              console.error('Failed to change email:', response.payload);
              // Optionally, show a UI error message
            }
          })
          .catch((error) => {
            console.error('Error changing email:', error);
            // Optionally, show a UI error message
          });
        break;
  
      default:
        console.error('Unexpected step');
        break;
    }
  };

  return (
    <div>
    {step == 1 && <input type="email" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />}
    {step === 2 && (
      <>
        <input
          type="text"
          placeholder="Old Email confirmation code"
          value={oldEmailOtp}
          onChange={(e) => setOldEmailOtp(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Email confirmation code"
          value={newEmailOtp}
          onChange={(e) => setNewEmailOtp(e.target.value)}
        />
      </>
    )}
      <button onClick={handleChangeEmail}>Change Email</button>
      {status === 'email-changed' && <p>Email changed successfully!</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default ChangeEmail;

