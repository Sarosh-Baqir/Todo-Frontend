import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../logo.png";
import LoadingIndicator from "../components/loadingIndicator";
import { VerifyUserValidation } from "../validation/verifyUserValidationSchema";
import { toast } from "react-toastify";
import { VerifyUserAction } from "../actions/verifyUserAction";

const VerifyUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState({ email: "", otp: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerification = async () => {
    setLoading(true);
    const validationErrors = VerifyUserValidation(account);
    setErrors(validationErrors);

    if (!validationErrors.hasErrors) {
      try {
        const response = await VerifyUserAction(account);

        toast.success(response.message || "Successfully Verified");
        setLoading(false);
        navigate("/");
      } catch (error) {
        setLoading(false);
        toast.error(error.message || "Verification failed");
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_right_bottom,rgba(41,124,191,0.8),rgba(41,124,191,0.8)),url('https://s3-alpha-sig.figma.com/img/598b/e375/6c1c4a778dc678d9b5c27f1c8875582d?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EzJOS7uLY9MNyCTLHt9cAoDPOhogLP8236inv~EoSIyRoKZnWe5PKtTqGL6OAIYg2BV35mA82BzwKb0vt~ob6JSc3enjFgD27q6PdbiO5CP2q1NEzlh4Uu8EH7pdxYUYElyMTTwYbn9dFCgZSdBJVlojujW4AyJPdnYI0F8HJh50f8e8gw6smAj6xoaUdm8~ujBNuEuSnabpVF46G7-AOPJycE2rdlYJcIe0ixFbMuvHRi3A-1hgdhgmh24u2jMGt8mjYTzC0ZE~88-dCT86~mX4d1DS~pK-kGh1-n77f6pGvY6Fv5OJI3HW3rEIWHR0ymBb1sAFxeQJVGqTUiux1g__')] bg-cover bg-center h-screen w-full">
      {loading && <LoadingIndicator loading={loading} />}
      <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-[90%] md:w-[80%] lg:w-[70%] h-auto md:h-[80%]">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-6 md:p-8">
          <img
            className="w-16 h-16 rounded-lg object-cover mb-4 md:mb-6"
            src={logo}
            alt="Logo"
          />
          <p className="text-xl md:text-2xl font-bold font-semibold mb-4 md:mb-6">
            Verify User
          </p>

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
          {/* OTP Input */}
          <div className="flex items-center border-2 border-[#777777] py-2 px-4 rounded mb-4 w-full">
            <FaLock className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="text"
              name="otp"
              value={account.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
            />
          </div>

          {/* Verify Button */}
          <button
            className="bg-[#297CBF] text-white w-full md:w-24 py-2 rounded-lg"
            onClick={handleVerification}
          >
            Verify
          </button>
          {/* Sign up Link */}
          <p className="mt-4 text-sm text-center md:text-left">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#297CBF]">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-4 md:p-8">
          <img
            className="w-full h-auto max-w-xs md:max-w-full"
            src="https://cdn.testbuddy.app/wp-content/uploads/2022/04/26125215/Test-Buddy-Blog-300x251.png"
            alt="Login Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;
