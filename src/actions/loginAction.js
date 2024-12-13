import axios from "axios";
import { LOGIN_ROUTE } from "../utils/constants";

export const loginAction = async (account) => {
  try {
    const { email, password } = account;
    const response = await axios.post(
      LOGIN_ROUTE,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token, data } = response.data.data;
    console.log("token: ", token);
    console.log("user: ", data);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(data));

    return response.data;
  } catch (error) {
    console.log("error in action: ", error);
    throw new Error(
      error.response?.data?.message || "An error occurred during login."
    );
  }
};
