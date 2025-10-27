import React, { createContext, useContext, useEffect, useState } from "react";
import { useLogout } from "../../api/user/hooks";
import API from "../../api/httpService";
import { clearAuthData } from "../../util/tokenManager";

const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  // Only throw if context is completely undefined (shouldn't happen with default values)
  if (!context || !context.hasOwnProperty("isAuthenticated")) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  }, []); // Empty dependency array to run only once on mount

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      // Clear all auth-related data from localStorage
      clearAuthData();
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout API fails, we should still set user as logged out locally
      // Clear all auth-related data from localStorage
      clearAuthData();
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
