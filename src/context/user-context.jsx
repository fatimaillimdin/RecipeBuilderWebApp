/** @format */

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext({
  user: null,
  setUser: (user) => {},
  logout: () => {},
});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout: () => {
          setUser(null);

          localStorage.removeItem("user");
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
