// signupValidation.js
export const SignupValidation = (account) => {
  let errors = {};

  // First Name Validation
  if (!account.first_name) {
    errors.first_name = "First name is required";
    errors.hasErrors = true;
  } else if (!/^[A-Za-z\s]+$/.test(account.first_name)) {
    errors.first_name = "First name can only contain letters and spaces";
    errors.hasErrors = true;
  }

  // Last Name Validation
  if (!account.last_name) {
    errors.last_name = "Last name is required";
    errors.hasErrors = true;
  } else if (!/^[A-Za-z\s]+$/.test(account.last_name)) {
    errors.last_name = "Last name can only contain letters and spaces";
    errors.hasErrors = true;
  }

  // Email Validation
  if (!account.email) {
    errors.email = "Email is required";
    errors.hasErrors = true;
  } else if (!/\S+@\S+\.\S+/.test(account.email)) {
    errors.email = "Email is invalid";
    errors.hasErrors = true;
  }

  // Phone Validation
  if (!account.phone) {
    errors.phone = "Phone number is required";
    errors.hasErrors = true;
  } else if (!/^\d{11,15}$/.test(account.phone)) {
    errors.phone = "Phone number must be between 11 and 15 digits";
    errors.hasErrors = true;
  }

  // Password Validation
  if (!account.password) {
    errors.password = "Password is required";
    errors.hasErrors = true;
  } else if (account.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
    errors.hasErrors = true;
  } else if (
    !/[A-Za-z]/.test(account.password) ||
    !/\d/.test(account.password)
  ) {
    errors.password = "Password must contain both letters and numbers";
    errors.hasErrors = true;
  }

  if (!errors.hasErrors) {
    delete errors.hasErrors;
  }

  return errors;
};
