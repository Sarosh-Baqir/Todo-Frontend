import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import logo from "../logo.png";
import LoadingIndicator from "../components/loadingIndicator";
import { toast } from "react-toastify";
import { SignupValidation } from "../validation/signupValidationSchema";
import { signupAction } from "../actions/signupAction";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    setLoading(true);
    const validationErrors = SignupValidation(account);
    setErrors(validationErrors);

    if (!validationErrors.hasErrors) {
      try {
        const formData = new FormData();
        if (image) {
          formData.append("profile_image", image);
        }
        const response = await signupAction(account, formData);

        toast.success(response.message || "Successfully Signed Up");
        setLoading(false);
        navigate("/verify-user");
      } catch (error) {
        setLoading(false);
        toast.error(error.message || "Signup failed");
      }
    } else {
      setLoading(false);
    }
  };
  const handleProfilePic = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(to_right_bottom,rgba(41,124,191,0.8),rgba(41,124,191,0.8)),url('https://s3-alpha-sig.figma.com/img/598b/e375/6c1c4a778dc678d9b5c27f1c8875582d?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EzJOS7uLY9MNyCTLHt9cAoDPOhogLP8236inv~EoSIyRoKZnWe5PKtTqGL6OAIYg2BV35mA82BzwKb0vt~ob6JSc3enjFgD27q6PdbiO5CP2q1NEzlh4Uu8EH7pdxYUYElyMTTwYbn9dFCgZSdBJVlojujW4AyJPdnYI0F8HJh50f8e8gw6smAj6xoaUdm8~ujBNuEuSnabpVF46G7-AOPJycE2rdlYJcIe0ixFbMuvHRi3A-1hgdhgmh24u2jMGt8mjYTzC0ZE~88-dCT86~mX4d1DS~pK-kGh1-n77f6pGvY6Fv5OJI3HW3rEIWHR0ymBb1sAFxeQJVGqTUiux1g__')] bg-cover bg-center h-screen w-full">
      {loading && <LoadingIndicator loading={loading} />}
      <div className="bg-white rounded-lg shadow-lg flex flex-col lg:flex-row w-[90%] lg:w-[80%] h-auto lg:h-[80%]">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-6 md:p-8">
          <img
            className="w-16 md:w-20 h-16 md:h-20 rounded-lg object-cover mb-4 md:mb-6"
            src={logo}
            alt="Logo"
          />
          <p className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Signup</p>

          {/* First Name Input */}
          <div className="flex items-center border-2 border-gray-400 py-2 px-3 rounded mb-3 md:mb-4 w-full">
            <FaUser className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="text"
              name="first_name"
              value={account.first_name}
              onChange={handleChange}
              placeholder="Enter First Name"
            />
          </div>
          {errors.first_name && (
            <p className="text-red-500">{errors.first_name}</p>
          )}

          {/* Last Name Input */}
          <div className="flex items-center border-2 border-gray-400 py-2 px-3 rounded mb-3 md:mb-4 w-full">
            <FaUser className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="text"
              name="last_name"
              value={account.last_name}
              onChange={handleChange}
              placeholder="Enter Last Name"
            />
          </div>
          {errors.last_name && (
            <p className="text-red-500">{errors.last_name}</p>
          )}

          {/* Email Input */}
          <div className="flex items-center border-2 border-gray-400 py-2 px-3 rounded mb-3 md:mb-4 w-full">
            <FaEnvelope className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="email"
              name="email"
              value={account.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </div>
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          {/* Phone Input */}
          <div className="flex items-center border-2 border-gray-400 py-2 px-3 rounded mb-3 md:mb-4 w-full">
            <FaPhoneAlt className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="text"
              name="phone"
              value={account.phone}
              onChange={handleChange}
              placeholder="Enter Phone"
            />
          </div>
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}

          {/* Password Input */}
          <div className="flex items-center border-2 border-gray-400 py-2 px-3 rounded mb-3 md:mb-4 w-full">
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
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePic}
          ></input>

          {/* Signup Button */}
          <button
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-800"
            onClick={handleSignup}
          >
            Sign Up
          </button>

          <p className="mt-4 text-sm md:text-base">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-white p-8">
          <img
            className="w-full h-auto"
            src="https://cdn.testbuddy.app/wp-content/uploads/2022/04/26125215/Test-Buddy-Blog-300x251.png"
            alt="Signup Illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
