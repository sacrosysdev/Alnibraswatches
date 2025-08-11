import React, { createContext, useContext, useEffect, useState } from "react";
import { useLogout } from "../../api/user/hooks";
import API from "../../api/httpService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const logoutMutation = useLogout();

  useEffect(() => {
    API.get("getUserAddress")
      .then(() => {
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
  }, []);

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout API fails, we should still set user as logged out locally
      setIsAuthenticated(false);
    }
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
