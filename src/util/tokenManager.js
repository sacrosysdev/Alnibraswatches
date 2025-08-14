// Token management utilities
export const TOKEN_KEY = "token";
export const USER_INFO_KEY = "userInfo";

// Store token in localStorage
export const storeToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

// Store user info in localStorage
export const storeUserInfo = (userInfo) => {
  if (userInfo) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Get user info from localStorage
export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};

// Check if user is authenticated (has valid token)
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Clear all authentication data
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
  localStorage.removeItem("alNibrazuserDet");
  localStorage.removeItem("alNibrazUserId");
  localStorage.removeItem("isLoged");
};

// Store complete auth data (token + user info)
export const storeAuthData = (authData) => {
  if (authData.token) {
    storeToken(authData.token);
  }
  if (authData.userInfo) {
    storeUserInfo(authData.userInfo);
  }
};
