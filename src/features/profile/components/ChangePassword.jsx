import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../profileSlice';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [step, setStep] = useState(0); // Step state for different form steps
  const [localError, setLocalError] = useState(''); // Local error state
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.profile);

  const handleChangePassword = () => {
    if (step === 0) {
      setStep(1); // Go to step 1 (input form)
    } else if (newPassword === confirmNewPassword) {
      dispatch(changePassword({ currentPassword, newPassword }));
    } else {
      setLocalError("Passwords don't match.");
    }
  };

  return (
    <div>
      {step === 0 && (
        <>
          <button onClick={handleChangePassword}>Update Password</button>
        </>
      )}
      
      {step === 1 && (
        <>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button onClick={handleChangePassword}>Submit</button>
        </>
      )}

      {status === 'password-changed' && <p>Password updated successfully!</p>}
      {localError && <p>{localError}</p>}
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default ChangePassword;

