"use client";
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);

export function UserWrapper({ children }) {

  let [user, setUser] = useState("Guest");
  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext)
}