import axios from "axios";
import { FORGET_PASSWORD_ROUTE } from "../utils/constants";

export const ForgetPasswordAction = async (account) => {
  try {
    const { email, otp, password } = account;
    const newPassword = password;
    const response = await axios.post(
      FORGET_PASSWORD_ROUTE,
      { email, otp, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("error in action: ", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during verifying."
    );
  }
};
