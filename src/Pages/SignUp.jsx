import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react"; // Import toast from react-toastify/
import logo from "../logo.png";
import { UserAuth } from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const toast = useToast(); // Initialize Chakra UI toast

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  // Regular expression pattern for email validation
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (!displayName || !email || !password || !confirmPass) {
      setError("All fields are required.");
      toast({
        title: "Error",
        description: "All fields are required.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!emailPattern.test(email)) {
      setError("Invalid email format.");
      toast({
        title: "Error",
        description: "Invalid email format.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(error);
      return;
    }

    if (password !== confirmPass) {
      setError("Passwords do not match.");
      toast({
        title: "Error",
        description: "Passwords do not match.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await createUser(email, password, displayName);
      navigate("/login");
      toast({
        title: "Success",
        description: "Registration successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      setError(e.message);
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log(e.message);
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <form onSubmit={handleSignUp}>
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="text"
            placeholder="Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded w-full tracking-wider"
              type="submit"
            >
              Signup
            </button>
          </div>
        </form>
        <div className="text-center md:text-left mt-4">
          <Link to="/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
