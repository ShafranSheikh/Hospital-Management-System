import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Redirect authenticated users to the dashboard or any desired route
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  // Render children (unauthenticated content) if not logged in
  return children;
};

export default PublicRoute;
