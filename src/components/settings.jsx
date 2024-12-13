import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import axiosInstance from "../lib/apiClient";
import { toast } from "react-toastify";
import { UPDATE_PASSWORD_ROUTE } from "../utils/constants";

const Settings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    setLoading(true);

    axiosInstance
      .post(UPDATE_PASSWORD_ROUTE, {
        oldPassword,
        newPassword,
      })
      .then((response) => {
        setLoading(false);
        toast.success(
          response?.data?.message || "Password updated successfully"
        );
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating password:", error);
        toast.error(error?.message || "Failed to update password");
      });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Profile Information</h2>
        <div className="mt-2">
          <div className="font-medium">Name</div>
          <div className="text-gray-500">
            {user.first_name} {user.last_name}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Change Password</h2>
        <div className="space-y-4 mt-4">
          {/* Old Password Input */}
          <div className="flex items-center border-2 border-[#777777] py-2 px-4 rounded mb-4 w-1/2">
            <FaLock className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="password"
              name="oldPassword"
              placeholder="Type Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          {/* New Password Input */}
          <div className="flex items-center border-2 border-[#777777] py-2 px-4 rounded mb-4 w-1/2">
            <FaLock className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="password"
              name="newPassword"
              placeholder="Set New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {/* Confirm Password Input */}
          <div className="flex items-center border-2 border-[#777777] py-2 px-4 rounded mb-4 w-1/2">
            <FaLock className="h-4 w-4 text-black" />
            <input
              className="pl-3 outline-none border-none w-full text-black bg-white"
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
