export const VerifyUserValidation = (account) => {
  let errors = {};
  if (!account.email) {
    errors.email = "Email is required";
    errors.hasErrors = true;
  } else if (!/\S+@\S+\.\S+/.test(account.email)) {
    errors.email = "Email is invalid";
    errors.hasErrors = true;
  }
  if (!account.otp) {
    errors.password = "OTP is required";
    errors.hasErrors = true;
  } else {
    errors.hasErrors = false;
  }
  return errors;
};
