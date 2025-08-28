import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenValid, forceLogout } from "../../utils/baseUrl";

const TokenValidator = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check token validity every minute
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");

      if (!token || !isTokenValid(token)) {
        console.log("Token expired or invalid, logging out...");
        forceLogout();
      }
    }, 60000); // Check every minute

    // Also check on window focus (when user comes back to tab)
    const handleFocus = () => {
      const token = localStorage.getItem("token");

      if (!token || !isTokenValid(token)) {
        console.log("Token expired or invalid on focus, logging out...");
        forceLogout();
      }
    };

    window.addEventListener("focus", handleFocus);

    // Listen for logout events from other tabs
    const handleStorageChange = (e) => {
      if (e.key === "logoutEvent" && e.newValue) {
        console.log("Logout event received from another tab");
        forceLogout();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default TokenValidator;
