import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRouter = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location=useLocation()
  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
          <span className="loading loading-ring loading-lg text-primary"></span>
          <span className="loading loading-ring loading-lg text-secondary"></span>
          <span className="loading loading-ring loading-lg text-accent"></span>
          <span className="loading loading-ring loading-lg text-neutral"></span>
          <span className="loading loading-ring loading-lg text-info"></span>
          <span className="loading loading-ring loading-lg text-success"></span>
          <span className="loading loading-ring loading-lg text-warning"></span>
          <span className="loading loading-ring loading-lg text-error"></span>
        </div>
      </>
    );
  }
  if (user) {
    return children;
  }
  return (
    <div>
      <Navigate to="/login" state={location?.pathname}></Navigate>
    </div>
  );

};

export default PrivateRouter;