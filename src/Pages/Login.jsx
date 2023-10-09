import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { UserAuth } from "../context/AuthContext";
import { auth, provider } from "../firebase";

function Login({}) {
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //   const [rememberMe, setRememberMe] = useState(false);

  //   useEffect(() => {
  //     if (rememberMe) {
  //       const storedEmail = localStorage.getItem("rememberedEmail");
  //       if (storedEmail) {
  //         setEmail(storedEmail);
  //       }
  //     }
  //   }, [rememberMe]);

  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      // Show validation error toast for missing fields
      toast({
        title: "Login Error",
        description: "Please enter both email and password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await signIn(email, password);
      navigate("/main-app");
      console.log("logged in!!!");
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      setError(e.message);

      // Show validation error toast for login failure
      toast({
        title: "Login Error",
        description: "Incorrect email or password entered!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt=""
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <form onSubmit={handleLogin}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <a
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              href="#"
              onClick={() => navigate("/reset-password")}
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-semibold uppercase rounded tracking-wider w-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <a
            className="text-red-600 hover:underline hover:underline-offset-4"
            href="#"
            onClick={() => navigate("/signup")}
          >
            Register
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
