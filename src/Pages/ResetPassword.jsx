import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { useToast } from "@chakra-ui/react";

function ResetPassword() {
  const { currentUser } = UserAuth();
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const handleResetPassword = async () => {
    setError(""); // Clear any previous errors
    setResetEmailSent(false); // Clear the reset email status

    if (!email) {
      // Display a validation error toast for missing email
      toast({
        title: "Error",
        description: "Please enter your email address.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      // Send a password reset email
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true); // Set the state to true
      setEmail(""); // Clear the email field

      // Display a success toast
      toast({
        title: "Success",
        description:
          "Password reset email sent successfully. Check your inbox.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      // Handle error, e.g., display an error message
      setError("Error sending password reset email. Please try again later.");

      // Display an error toast
      toast({
        title: "Error",
        description:
          "Error sending password reset email. Please try again later.",
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
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold">Reset Password</h2>
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="mt-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded w-full tracking-wider"
            onClick={handleResetPassword}
          >
            Send Reset Link
          </button>
        </div>

        <div className="mt-4 font-semibold text-md text-slate-500 text-center md:text-left">
          Remember your password?{" "}
          <Link
            className="text-blue-600 hover:underline hover:underline-offset-4"
            to="/login"
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
