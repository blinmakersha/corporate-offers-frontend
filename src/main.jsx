import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);