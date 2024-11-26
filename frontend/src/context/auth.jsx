import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [admin, setAdmin] = useState("");
  const [accessToken, setAccessToken] = useState()
  const login = (userData) => {
    setAdmin(userData);
  };

  const logout = () => {
    setAdmin(null);
  };

  const access = (token) => {
    setAccessToken(token)
  }
  const updateUser = (updatedData) => {
    setAdmin((prevUser) => ({ ...prevUser, ...updatedData }));
  };

  return (
    <UserContext.Provider value={{ admin, login, logout, access }}>
      {children}
    </UserContext.Provider>
  );
};
