import { getBaseUrl } from "../../utils/baseUrl";

export const getImageUrl = (path) => {
  // Check if path is undefined, null, or empty
  if (!path) {
    return "https://via.placeholder.com/50"; // Return a fallback image
  }

  // Now it's safe to check startsWith
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  } else {
    const baseUrl = getBaseUrl();
    // const baseUrl = "http://10.0.60.126:6007";
    return `${baseUrl}/${path}`;
  }
};
