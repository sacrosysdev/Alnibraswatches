import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputFieldAuth } from "../../../components/user/InputFieldAuth";
import { Link, useNavigate } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { loginValidation } from "../../../components/user/validations";
import { useSignIn } from "../../../api/user/hooks";
import { useAuth } from "../../../contexts/user/AuthContext";
import { storeAuthData } from "../../../util/tokenManager";

const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isError } = useSignIn();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const initialValues = {
    email: "",
    Password: "",
    remember: true,
  };
  const handleSubmit = (values) => {
    const { repeatPassword, agree, ...payload } = values;
    mutate(payload, {
      onSuccess: (data) => {
        // Store token and user info in localStorage
        if (data.data && data.data.token) {
          storeAuthData({
            token: data.data.token,
            userInfo: data.data.userInfo[0],
          });
        }

        const userDet = [
          {
            name: data.data.userInfo[0].FullName,
            email: data.data.userInfo[0].Email,
            phone: data.data.userInfo[0].PhoneNumber,
          },
        ];
        localStorage.setItem("alNibrazuserDet", JSON.stringify(userDet));
        localStorage.setItem("alNibrazUserId", data.data.userInfo[0].UserId);

        // Update auth context
        login(userDet);

        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      },
      onError: (error) => {
        setError(error.response.data.message);
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="py-5 xl:py-8 flex justify-between items-center">
          <h1 className="font-semibold text-xl">Login</h1>

          <Link to="/register">
            <p className="text-[#005C53] text-base font-medium">
              Create an account
            </p>
          </Link>
        </div>
        <p className="text-red-500 text-center">{error}</p>
        <div className=" space-y-4">
          <div className="grid grid-cols-1">
            <InputFieldAuth
              name="email"
              placeholder="Email ID"
              type="email"
              icon={<FaUserLarge />}
            />
          </div>

          <div className="grid grid-cols-1">
            <InputFieldAuth
              name="Password"
              placeholder="Password"
              icon={<FaLock />}
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-start space-x-2  ">
              <Field type="checkbox" name="agree" className="w-4 h-4" />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm text-gray-700">
              <Link to="/reset-password">Forgotten Password?</Link>
            </div>
          </div>
          <div className="h-5">
            <ErrorMessage
              name="remember"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div className="bg-[#005C53] text-white flex mx-auto w-fit mt-10 rounded-full">
            <button
              type="submit"
              className="uppercase cursor-pointer py-3 px-10 tracking-wider"
            >
              Sign in
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};
export default LoginForm;
