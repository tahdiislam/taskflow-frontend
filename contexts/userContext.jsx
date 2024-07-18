/** @format */

"use client";
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext(null);

export function UserWrapper({ children }) {
  let [user, setUser] = useState("Guest");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(window.localStorage.getItem("user_id"));
    }
  }, []);

  useEffect(() => {
    if (!userId) return;
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEDN_URL_PROD}/customer/list/?user_id=${userId}`
      )
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        if (res.status === 200) {
          setUser(res?.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const value = { user, setUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
