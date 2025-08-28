import jwtDecode from "jwt-decode";

export const getBaseUrl = () => {
  return "http://145.223.75.211:6007"; // replace with your API base URL
  // return "http://10.10.7.62:6007"; // replace with your API base URL
};

// JWT Token validation utilities
export const decodeJWT = (token) => {
  try {
    if (!token) return null;

    // Use jwt-decode library for secure and reliable decoding
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const isTokenValid = (token) => {
  try {
    const decoded = decodeJWT(token);
    if (!decoded) return false;

    // Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return false;
    }

    // Check if token has required fields
    if (!decoded.role || !decoded.email || !decoded.id) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error validating token:", error);
    return false;
  }
};

export const isVendorRole = (token) => {
  try {
    const decoded = decodeJWT(token);
    return decoded && decoded.role === "VENDOR";
  } catch (error) {
    return false;
  }
};

// Get current user info from token
export const getCurrentUser = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = decodeJWT(token);
    if (!decoded || !isTokenValid(token)) return null;

    return {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      exp: decoded.exp,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Force logout and clear all data
export const forceLogout = () => {
  localStorage.clear();
  // Set logout event for other tabs
  localStorage.setItem("logoutEvent", Date.now().toString());
  window.location.href = "/auth/login";
};
