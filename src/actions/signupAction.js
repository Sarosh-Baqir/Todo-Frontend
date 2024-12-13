import axios from "axios";
import { SIGNUP_ROUTE } from "../utils/constants";

export const signupAction = async (account, formData) => {
  try {
    const { first_name, last_name, phone, email, password } = account;
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);
    const response = await axios.post(SIGNUP_ROUTE, formData, {});
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
