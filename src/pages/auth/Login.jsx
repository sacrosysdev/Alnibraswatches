import React from "react";
import image from "../../assets/images/auth/login pic.png";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="w-full h-screen max-w-screen-xl mx-auto flex flex-col md:flex-row ">
      <div className="w-full md:w-6/12 h-fit md:h-full  flex items-center">
        <img
          src={image}
          className="w-full  h-auto object-cover object-center"
          alt=" image of a girl infront of a computer"
        />
      </div>
      <div className="bg-white p-4 w-6/12 h-full flex flex-col items-center justify-center lg:px-28">
        <h1 className="font-DM font-semibold text-3xl text-gray-900 mb-8 ">
          updaged Login
        </h1>
        <div className="w-full h-fit">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
