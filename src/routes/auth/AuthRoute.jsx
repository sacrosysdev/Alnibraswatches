import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/auth/Login";
import SignUp from "../../pages/auth/SignUp";

const AuthRoute = () => {
  return (
    <Routes>
      <Route index element={<Navigate to={"login"} />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
};

export default AuthRoute;
