import { z } from "zod";

export const AuthUserSignUpSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine((val) => {
      const hasUppercase = /[A-Z]/.test(val);
      const hasLowercase = /[a-z]/.test(val);
      const hasNumber = /\d/.test(val);
      const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(
        val
      );

      if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
        return {
          message:
            "Password must contain uppercase, lowercase, number, and special character",
        };
      }

      // No explicit return value needed here, Zod handles successful validation
    }, "Password must be strong"),
  username: z.string().min(4, "Full name is required"),
});

const AuthUserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export default AuthUserSignInSchema;
