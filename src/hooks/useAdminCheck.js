import { useSelector } from 'react-redux';

export const useAdminCheck = () => {
  const { user } = useSelector((state) => state.auth);
  return {
    isAdmin: user && user.roles.includes(6),
  };
};
