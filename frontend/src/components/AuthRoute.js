// src/components/AuthRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthRoute = ({ component: Component }) => {
  const authToken = localStorage.getItem('authToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (!authToken || !refreshToken) {
    return <Navigate to="/authentication/sign-in" />;
  }

  return <Component />;
};

AuthRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
};

export default AuthRoute;