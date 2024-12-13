import axios from "axios";
import { VERIFY_USER_ROUTE } from "../utils/constants";

export const VerifyUserAction = async (account) => {
  try {
    const { email, otp } = account;
    const response = await axios.post(
      VERIFY_USER_ROUTE,
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { user } = response.data.data;
    console.log("user: ", user);

    return response.data;
  } catch (error) {
    console.log("error in action: ", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during verifying."
    );
  }
};
