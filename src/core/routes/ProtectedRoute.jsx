import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../services/api";

const ProtectedRoute = ({ children, roles }) => {
  const accessToken = localStorage.getItem("AccessToken");
  const user = localStorage.getItem("user");
  let roleUser;
  if (user) {
    roleUser = JSON.parse(user).user.role;
  }
  useEffect(() => {
    api.ApiCities.getCities(accessToken)
      .then(() => {})
      .catch((error) => {
        if (error.status == 401) {
          localStorage.removeItem("AccessToken");
          localStorage.removeItem("user");
        }
      });
  }, []);

  return accessToken && roles.includes(roleUser) ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
