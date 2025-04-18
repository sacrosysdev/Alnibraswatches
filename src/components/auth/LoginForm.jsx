import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import { LoginValidation } from "../../constant/schema";

function LoginForm({ onToggle }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);

  const initialValues = {
    username: "",
    password: "",

    rememberMe: false,
  };
  const handleSubmit = (values, { setFieldError, setSubmitting }) => {
    const { username, password } = values;
    if (username !== "admin") {
      setFieldError("username", "Invalid username");
      setSubmitting(false);
    } else if (password !== "admin") {
      setFieldError("password", "Incorrect password");
      setSubmitting(false);
    } else {
      setFormError(null);

      navigate("/dashboard");
      setSubmitting(false);
    }
  };
  return (
    <div className="w-full h-full  ">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginValidation}
      >
        {({ isSubmitting, setSubmitting }) => (
          <Form className="w-full h-fit flex flex-col gap-y-2">
            <div>
              <label className="block text-xl font-semibold font-DM my-2 text-gray-900">
                Username
              </label>
              <Field
                type="text"
                name="username"
                placeholder="Enter your Username"
                className="w-full p-2 px-4 min-h-12 border bg-[#E6F5F4] placeholder:font-public placeholder:tracking-tight placeholder:text-base border-[#A3C4C1] rounded-lg outline-0 focus:outline-none focus:ring-1 focus:[#003F38]"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>
            <div className="relative">
              <label className="block text-xl font-semibold font-DM my-2 text-gray-900">
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 px-4 border  min-h-12 bg-[#E6F5F4] border-[#A3C4C1] placeholder:tracking-tight placeholder:font-public placeholder:text-base rounded-lg outline-0 focus:outline-none focus:ring-1 focus:ring-[#003F38]"
                />
                <button
                  type="button"
                  className="absolute right-3 top-4 text-lg text-[#A7A7A7]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-xs"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mt-4">
              <Field
                type="checkbox"
                name="rememberMe"
                className="mr-2 h-4 w-4 accent-[#003F38]"
              />
              <label className="text-sm font-public  font-semibold">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#003F38] mt-8 h-12 text-white text-sm py-2 font-rubik rounded-lg hover:bg-[#00564D] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-5 
              disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in" : "Email Login"} <FaArrowRight />
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
