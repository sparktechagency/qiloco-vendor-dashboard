import { Navigate } from "react-router-dom";
import { isTokenValid, isVendorRole } from "../utils/baseUrl";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const vendorRole = localStorage.getItem("Vendor");

  // Check if token exists and is valid
  if (!token || !isTokenValid(token)) {
    // Clear invalid data
    localStorage.clear();
    return <Navigate to="/auth/login" replace />;
  }

  // Check if user has VENDOR role
  if (!isVendorRole(token)) {
    // Clear invalid data
    localStorage.clear();
    return <Navigate to="/auth/login" replace />;
  }

  // Additional check: ensure localStorage role matches token role
  if (vendorRole !== "VENDOR") {
    // Clear invalid data
    localStorage.clear();
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
