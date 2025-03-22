import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailVerification from '../features/profile/components/EmailVerification';
import ChangeEmail from '../features/profile/components/ChangeEmail';
import ChangePassword from '../features/profile/components/ChangePassword';
import { updateUserProfile } from '../features/profile/profileSlice';
import { updateUser } from '../features/auth/authSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { status, error } = useSelector((state) => state.profile);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    dispatch(updateUserProfile({ firstName, lastName }))
    .then((response) => {
      if (response.payload.status != "error") {
        dispatch(updateUser({ firstName, lastName }));
        setIsEditing(false); // Exit editing mode after saving
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
      }
    })
  };

  return (
    <div>
      <h2>Profile Settings</h2>

      {/* Editable First Name */}
      <h3>First name:</h3>
      {isEditing ? (
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      ) : (
        <p>{user.firstName}</p>
      )}

      {/* Editable Last Name */}
      <h3>Last name:</h3>
      {isEditing ? (
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      ) : (
        <p>{user.lastName}</p>
      )}

      {/* Toggle Edit Mode */}
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}

      {/* Email Section */}
      <h3>Email:</h3>
      <p>{user.email}{user.isEmailVerified ? "" : " - not verified"}</p>
      {!user?.isEmailVerified && <EmailVerification email={user.email} />}
      <ChangeEmail currentEmail={user.email} />

      {/* Password Section */}
      <h3>Password:</h3>
      <p>*******</p>
      <ChangePassword />

      {/* Status Messages */}
      {status === 'profile-updated' && <p>Profile updated successfully!</p>}
      {error && <p style={{ color: "red" }}>{typeof error === "string" ? error : error.message}</p>}
    </div>
  );
};

export default ProfilePage;

