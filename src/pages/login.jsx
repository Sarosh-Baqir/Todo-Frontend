import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../logo.png";
import LoadingIndicator from "../components/loadingIndicator";
import { loginAction } from "../actions/loginAction";
import { toast } from "react-toastify";
import { LoginValidation } from "../validation/loginValidationSchema";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setLoading(true);
    const validationErrors = LoginValidation(account);
    setErrors(validationErrors);

    if (!validationErrors.hasErrors) {
      try {
        const response = await loginAction(account);

        toast.success(response.message || "Successfully Logged In");
        setLoading(false);
        navigate("/dashboard");
      } catch (error) {
        setLoading(false);
        toast.error(error.message || "Login failed");
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_right_bottom,rgba(41,124,191,0.8),rgba(41,124,191,0.8)),url('https://s3-alpha-sig.figma.com/img/598b/e375/6c1c4a778dc678d9b5c27f1c8875582d?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EzJOS7uLY9MNyCTLHt9cAoDPOhogLP8236inv~EoSIyRoKZnWe5PKtTqGL6OAIYg2BV35mA82BzwKb0vt~ob6JSc3enjFgD27q6PdbiO5CP2q1NEzlh4Uu8EH7pdxYUYElyMTTwYbn9dFCgZSdBJVlojujW4AyJPdnYI0F8HJh50f8e8gw6smAj6xoaUdm8~ujBNuEuSnabpVF46G7-AOPJycE2rdlYJcIe0ixFbMuvHRi3A-1hgdhgmh24u2jMGt8mjYTzC0ZE~88-dCT86~mX4d1DS~pK-kGh1-n77f6pGvY6Fv5OJI3HW3rEIWHR0ymBb1sAFxeQJVGqTUiux1g__')] bg-cover bg-center h-screen w-full">
      {loading && <LoadingIndicator loading={loading} />}
      <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row w-[90%] lg:w-[80%] h-auto lg:h-[80%]">
        {/* Left Section */}
        <div className="lg:w-1/2 w-full flex flex-col justify-center items-start p-6 lg:p-8">
          <img
            className="w-16 h-16 rounded-lg object-cover mb-4 lg:mb-6"
            src={logo}
            alt="Logo"
          />
          <p className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Login</p>

          {/* Email Input */}
          <div className="flex items-center border-2 border-[#777777] py-2 px-4 rounded mb-4 w-full">
            <FaUser className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="email"
              name="email"
              value={account.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </div>
          {/* Password Input */}
          <div className="flex items-center border-2 border-[#777777] py-2 px-4 rounded mb-4 w-full">
            <FaLock className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="password"
              name="password"
              value={account.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </div>

          {/* Login Button */}
          <button
            className="bg-[#297CBF] text-white w-full lg:w-24 py-2 rounded-lg"
            onClick={handleLogin}
          >
            Login
          </button>
          {/* Sign up Link */}
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#297CBF]">
              Sign up
            </Link>
          </p>

          {/* Reset Password Link */}
          <p className="mt-4 text-sm text-center">
            Forgot Password?{" "}
            <Link to="/forget-password" className="text-[#297CBF]">
              Reset Password
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 w-full flex items-center justify-center p-4 lg:p-8">
          <img
            className="w-full h-auto"
            src="https://cdn.testbuddy.app/wp-content/uploads/2022/04/26125215/Test-Buddy-Blog-300x251.png"
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
