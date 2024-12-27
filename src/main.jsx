import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CreateOfferCardPage from "./pages/CreateOfferCardPage/CreateOfferCardPage.jsx";
import EditOfferCardPage from "./pages/EditOfferCardPage/EditOfferCardPage.jsx";
import OfferCardPage from "./pages/OfferCardPage/OfferCardPage.jsx";
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
  {
    path: "edit-offer-card/:id",
    element: (
      <ProtectedRoute roles={["Admin"]}>
        <EditOfferCardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/offer/:id",
    element: (
      <ProtectedRoute roles={["Employee", "Admin"]}>
        <OfferCardPage />
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
