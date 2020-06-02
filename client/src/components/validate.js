const isPasswordValid = (password) => {
  if (password.length < 6) {
    return false;
  }
  return true;
};

const passwordConfirmCheck = (password, confirmPassword = "") =>
  password === confirmPassword;

// checks for the syntax validity of an email address
const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validate = {
  isPasswordValid,
  passwordConfirmCheck,
  emailIsValid,
};

export default validate;
