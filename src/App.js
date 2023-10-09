import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";
import Main from "./components/Main";
import Login from "./Pages/Login";
import Signup from "./Pages/SignUp";
import MyAnalysis from "./Pages/MyAnalysis";
import { AuthContextProvider } from "./context/AuthContext";
import ResetPassword from "./Pages/ResetPassword";
import Layout from "./components/Layout";

function App() {
  // const signInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const userEmail = result.user.email;
  //     setUser(userEmail);
  //     localStorage.setItem("email", userEmail);
  //   } catch (error) {
  //     // Handle login error
  //     console.error("Login error:", error);
  //   }
  // };

  // useEffect(() => {
  //   const storedEmail = localStorage.getItem("email");
  //   if (storedEmail) {
  //     setUser(storedEmail);
  //   }
  // }, []);

  // console.log(user);

  return (
    <div className="container mx-auto">
      {/* ... Other parts of your App component */}
      <AuthContextProvider>
        <Routes>
          {/* Route for the login screen */}
          <Route path="/" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          {/* Route for the main app */}
          <Route
            path="/main-app"
            element={
              <Layout>
                <Main />
              </Layout>
            }
          />

          {/* Wrap MyAnalysis component with Layout */}
          <Route
            path="/my-analysis"
            element={
              <Layout>
                <MyAnalysis />
              </Layout>
            }
          />

          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Redirect to login if the path doesn't match */}
          <Route path="/*" element={<Login />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
