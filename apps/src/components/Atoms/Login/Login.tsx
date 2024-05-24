'use client'
import React, { useState } from "react";
import AfterLogin from "./AfterLogin";
import BeforeLogin from "./BeforLogin";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to toggle login status
  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const handleLogin = () => {
    // Set isLoggedIn to true to indicate that the user is logged in
    setIsLoggedIn(true);
  };
  

  return (
    <div>
      {isLoggedIn ? <AfterLogin /> : <BeforeLogin onLogin={handleLogin} />}
      <p onClick={toggleLogin}>{isLoggedIn ? "" : ""}</p>
    </div>
  );
};

export default Login;
