import apiService from '../../services/api';
import Cookies from 'js-cookie';

// Get user from localStorage
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const register = async (userData) => {
  try {
    const response = await apiService.post('/auth/register', userData);
    console.log("response inside register authService", response);

    // Check if the response contains user data (successful registration)
    if (response.user) {
      // Save user and token to localStorage and Cookies
      localStorage.setItem('user', JSON.stringify(response.user));
      Cookies.set('token', response.token, { secure: true, httpOnly: false });
      return response.user;
    }

    // If there's a message (e.g., email already in use), return the message
    return response.message; // This will return the message from the backend (e.g., "Email already in use")
  } catch (error) {
    throw error; // You can throw an error to be caught in the component
  }
};

const login = async (userData) => {
  try {
    const response = await apiService.post('/auth/login', userData);
    // If OTP is required
    if (response.message && response.message.includes("OTP")) {
      return { otpRequired: true, message: response.message }; // Handle OTP requirement message
    }
    // If login is successful without OTP
    if (response.token) {
      // Save user and token as before
      localStorage.setItem('user', JSON.stringify(response.user));
      Cookies.set('token', response.token, { secure: true, httpOnly: false });
      return { otpRequired: false, user: response.user };
    } else if (response.message) {
      throw new Error(response.message);
    }
    throw new Error('Unexpected response from server');
    
  } catch (error) {
    // Handle errors (e.g., wrong credentials or server errors)
    if (error.response) {
      // Specific error from server response (if available)
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw error; // General error handling
  }
};

// Logout user
const logout = () => {
  // Clear user and token from localStorage and Cookies
  localStorage.removeItem('user');
  Cookies.remove('token');
};

const authService = {
  register,
  login,
  logout,
  getUser,
};

export default authService;

