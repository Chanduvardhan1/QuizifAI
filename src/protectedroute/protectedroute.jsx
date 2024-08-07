import React, { useContext } from 'react';
// import { useAuth } from '../Authcontext/AuthContext';
import { Navigate } from 'react-router-dom';

const Protectedroute = ({ children }) => {
    const { isAuthenticated } = useContext(useAuth);
  
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };

export default Protectedroute;
