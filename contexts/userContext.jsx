/** @format */

"use client";
import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext(null);

export function UserWrapper({ children }) {
  let [user, setUser] = useState("Guest");
  const [userId, setUserId] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(window.localStorage.getItem("user_id"));
      setAdmin(window.localStorage.getItem("admin"));
    }
  }, []);

  const fetchUser = async () => {
    if (!userId) return;
    setUserLoading(true);
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_PROD}/user/list/?user_id=${userId}`
      )
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        if (res.status === 200) {
          setUser(res?.data?.results[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setUserLoading(false));
  };
  useEffect(() => {
    fetchUser();
  }, [userId]);

  const value = { user, setUser, userLoading, userId, fetchUser, admin };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
