// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const api = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://10.0.70.126:6007",
//     // baseUrl: "http://192.168.10.195:5000/api"
//   }),
//   endpoints: () => ({}),
// });

// export const imageUrl = "http://10.0.70.126:6007";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  // baseUrl: "http://10.0.60.126:6007",
  // credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("ngrok-skip-browser-warning", "true");
    const token = localStorage.getItem("token");
    if (token) {
      try {
        headers.set("Authorization", `Bearer ${token}`);
      } catch (error) {
        console.error("Invalid token format:", error);
      }
    }
    return headers;
  },
});

export const imageUrl = getBaseUrl();
// export const imageUrl = "http://10.0.60.126:6007";

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["Products", "Status", "Profile", "Notification"],
});
