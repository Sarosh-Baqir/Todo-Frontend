export const LoginValidation = (account) => {
  let errors = {};
  if (!account.email) {
    errors.email = "Email is required";
    errors.hasErrors = true;
  } else if (!/\S+@\S+\.\S+/.test(account.email)) {
    errors.email = "Email is invalid";
    errors.hasErrors = true;
  }
  if (!account.password) {
    errors.password = "Password is required";
    errors.hasErrors = true;
  } else if (account.password.length < 5) {
    errors.password = "Password must be more than five characters";
    errors.hasErrors = true;
  } else {
    errors.hasErrors = false;
  }
  return errors;
};
