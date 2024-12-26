import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles }) => {
  const accessToken = localStorage.getItem("AccessToken");
  const user = localStorage.getItem("user");
  const roleUser = JSON.parse(user).user.role;

  return accessToken && roles.includes(roleUser) ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
