"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import "../../globals.css";
import signupValidation from "../../../schema/Auth@Validation";
import { Button } from "../../../components/Atoms/Button/Button";
import { Typography } from "../../../components";
import axios from "axios";

interface DataTypes {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [emailClient, setEmailClient] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmailClient(value);
    if (name === "password") setPassword(value);
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: DataTypes = { email: emailClient, password: password };
    try {
      await signupValidation.validate(data, { abortEarly: false });

      const response = await axios.post(
        `http://localhost:3000/v1/auth/login`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.data.message === "Login Successfully") {
        // Handle success response
        window.location.href = "/";
      }
    } catch (error: any) {
      const fieldErrors: { [key: string]: string } = {};

      if (error.inner) {
        error.inner.forEach((err: any) => {
          fieldErrors[err.path] = err.message;
        });
      } else if (error.response) {
        // Handling server-side error
        const { status, data } = error.response;
        if (status === 401 || status === 400) {
          setError(
            data.message || "Invalid email or password. Please try again."
          );
        } else {
          setError("Email or Password  is Incorrect, Please try again.");
        }
      } else {
        console.error("Unexpected error structure", error);
      }
      console.log("Field Error", fieldErrors);
      setErrors(fieldErrors);
    }
  };
  return (
    <div className="flex justify-between h-screen w-screen">
      {/* left */}
      <div className="w-[65%] text-white relative flex justify-center items-center shadow-md max-lg:hidden">
        <div>
          <Image
            alt="panel"
            src={"/login/pandel1.svg"}
            width={680}
            height={360}
          />
        </div>
      </div>
      {/* right */}
      <div className="flex w-[35%] justify-center items-center h-screen relative max-lg:w-full">
        <div aria-label="form" className="flex flex-col items-center">
          <Link href={"/"}>
            <button>
              <Image
                alt="panel"
                src={"/login/logo.svg"}
                width={150}
                height={80}
              />
            </button>
          </Link>
          <div>
            <form
              action="login"
              className="mt-5 flex flex-col gap-3 items-center"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col">
                <input
                  type="email"
                  className="w-[400px] max-sm:w-[290px] h-[60px] border border-[#cccccd] rounded-lg pl-4 focus:outline-none"
                  placeholder="yourname@example.com"
                  name="email"
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-[#EB5757] ">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="password"
                  className="w-[400px] h-[60px] max-sm:w-[290px] border border-[#cccccd] rounded-lg pl-4 focus:outline-none"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-[#EB5757] ">{errors.password}</p>
                )}
              </div>
              <div className="flex justify-end w-full">
                <Link href={"/login/forgot"}>
                  <p className="text-[#343A40]">
                    Forgot your{" "}
                    <span className="text-[#9747FF] hover:text-[#d1b6f6]">
                      password
                    </span>
                    ?
                  </p>
                </Link>
              </div>

              <div className="flex flex-col items-center mt-4">
                <Button
                  type="submit"
                  className="w-[400px] h-[60px] bg-[#7B2CBF] max-sm:w-[290px] hover:text-[#d1b6f6] text-white rounded-lg hover:opacity-[80%]"
                  colorScheme="primary"
                >
                  <Typography fontSize="caption" color="submit">
                    Login
                  </Typography>
                </Button>
              </div>

              {error && <p className="text-[#EB5757] mt-2">{error}</p>}

              <p className="text-center text-gray-400">
                _____________________
                <span className="text-[#7b2cbf]">or</span>
                _______________________
              </p>
              <p className="text-center text-[#434A4F]">
                {" Don't have an account? "}
                <Link
                  href={"/signup"}
                  className="text-[#9747FF] hover:text-[#d1b6f6]"
                >
                  Sign up
                </Link>
              </p>
              <div className="flex flex-col items-center justify-center mt-2 gap-2">
                <button className="flex flex-row items-center gap-2 w-[370px] h-[64px] border justify-center rounded-lg hover:opacity-[80%] max-sm:w-[290px]">
                  <Image
                    src={"/socialMedia/facebook.svg"}
                    alt="facebook"
                    width={32}
                    height={32}
                  />
                  <div className="text-[#434A4F]">Continue with Facebook</div>
                </button>
                <button className="flex flex-row items-center gap-2 w-[370px] h-[64px] border justify-center rounded-lg hover:opacity-[80%] max-sm:w-[290px]">
                  <Image
                    src={"/socialMedia/google.svg"}
                    alt="google"
                    width={32}
                    height={32}
                  />
                  <div className="text-[#434A4F]">Continue with Google</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
