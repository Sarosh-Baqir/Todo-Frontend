import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Signup from "../pages/signup";
import VerifyUser from "../pages/verifyUser";

function AppRoutes() {
  const PrivateRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? element : <Navigate to="/" />;
  };
  const PublicRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Navigate to="/" /> : element;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoute element={<Login />} />,
    },
    {
      path: "/signup",
      element: <PublicRoute element={<Signup />} />,
    },
    {
      path: "/verify-user",
      element: <PublicRoute element={<VerifyUser />} />,
    },
    {
      path: "/dashboard",
      element: <PrivateRoute element={<Dashboard />} />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRoutes;
