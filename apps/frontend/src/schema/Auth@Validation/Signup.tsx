import * as Yup from "yup";

const signupValidation = Yup.object().shape({
  username: Yup.string()
    .max(25, "Username must be 25 characters or less")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .trim()
});

export default signupValidation;
