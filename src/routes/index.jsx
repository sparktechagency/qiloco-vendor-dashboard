import { createBrowserRouter } from "react-router-dom";
import Auth from "../Layout/Auth/Auth";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Dashboard/Home/Home";

import Login from "../Pages/Auth/Login";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import VerifyOtp from "../Pages/Auth/VerifyOtp";
import ResetPassword from "../Pages/Auth/ResetPassword";
import NotFound from "../NotFound";

import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import Setting from "../Pages/Dashboard/Setting/Setting.jsx";

// import OrderDetails from "../Pages/Dashboard/OrderDetails/OrderDetails.jsx";
import Earnings from "../Pages/Dashboard/Earnings/Earnings.jsx";
import ReturnPolicy from "../Pages/Dashboard/Policy/ReturnPolicy.jsx";
import PrivacyPolicy from "../Pages/Dashboard/Policy/PrivacyPolicy.jsx";
import ProductList from "../Pages/Dashboard/ProductList/ProductList.jsx";
import OrderManagement from "../Pages/Dashboard/OrderManagement/OrderManagement.jsx";
import Notifications from "../Pages/Dashboard/Notification/Notifications.jsx";

const router = createBrowserRouter([
  {
    path: "/",

    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product-list",
        element: <ProductList />,
      },
      {
        path: "/order-management",
        element: <OrderManagement />,
      },
      {
        path: "/earnings",
        element: <Earnings />,
      },
      {
        path: "/return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/profile",
        element: <AdminProfile />,
      },
      {
        path: "/notification",
        element: <Notifications />,
      },
      {
        path: "/my-profile",
        element: <Setting />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "verify-otp",
        element: <VerifyOtp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
