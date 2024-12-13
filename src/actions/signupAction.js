import axios from "axios";
import { SIGNUP_ROUTE } from "../utils/constants";

export const signupAction = async (account) => {
  try {
    const { first_name, last_name, phone, email, password } = account;
    const response = await axios.post(
      SIGNUP_ROUTE,
      { email, password, first_name, last_name, phone },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { user } = response.data.data;
    console.log("user registered: ", user);

    return response.data;
  } catch (error) {
    console.log("error in action: ", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during signup."
    );
  }
};
