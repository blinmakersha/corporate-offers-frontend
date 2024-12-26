import { createContext, useContext, useState } from "react";
import React from "react";

const defaultUser = {
  id: "",
  name: "",
  email: "",
  token: "",
  role: "",
};

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
