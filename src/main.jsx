import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CreateOfferCardPage from "./pages/CreateOfferCardPage/CreateOfferCardPage.jsx";
import Layout from "../src/components/Layout/Layout.jsx";
import ProtectedRoute from "./core/routes/ProtectedRoute.jsx";
import { UserProvider } from "./utils/UserProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute roles={["Employee", "Admin"]}>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["Admin"]}>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "create-offer-card",
    element: (
      <ProtectedRoute roles={["Admin"]}>
        <CreateOfferCardPage />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Layout>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </Layout>
);
