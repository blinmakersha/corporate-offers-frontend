import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import OfferCardPage from "./pages/OfferCardPage/OfferCardPage.jsx";
import CreateOfferCard from "./pages/CreateOfferCardPage/CreateOfferCardPage.jsx";
import Layout from "../src/components/Layout/Layout.jsx";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = () => {
    return localStorage.getItem("isAuthenticated") === "true";
  };
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/offercardpage",
    element: <OfferCardPage />,
  },
  {
    path: "create-offer-car",
    element: <CreateOfferCard />,
  },
  {  
    path: "/offercardpage/:id",
    element: (
      <ProtectedRoute>
        <OfferCardPage />
      </ProtectedRoute>
    ),
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Layout>
    <RouterProvider router={router} />
  </Layout>
);
