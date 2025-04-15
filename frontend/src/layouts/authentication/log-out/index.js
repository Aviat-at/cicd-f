import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from local storage or any other storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');

    // Redirect to login page
    navigate('/authentication/sign-in');
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;