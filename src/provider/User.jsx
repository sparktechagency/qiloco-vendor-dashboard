import React, { useContext, useEffect, useState } from "react";
import { useProfileQuery } from "../redux/apiSlices/pofileSlice";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const { data: profile, isLoading } = useProfileQuery();
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   if (profile?.data) {
  //     setUser({
  //       name: profile.data?.name || "",
  //       email: profile.data?.email || "",
  //       mobileNumber: profile.data?.phoneNumber || "",
  //       image: profile.data?.image || "",
  //       role: profile.data?.role || "",
  //     });
  //   }
  // }, [profile]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
