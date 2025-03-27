import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("Vendor");

  // Array of allowed roles
  const allowedRoles = ["VENDOR"];

  // Check if the token is in the allowed roles array
  if (!allowedRoles.includes(token)) {
    return <Navigate to="/auth/login" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
