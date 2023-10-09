import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile, // Import updateProfile
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const UserContext = createContext();
export const AuthProvider = UserContext.Provider;

export const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const createUser = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set the displayName using updateProfile
      await updateProfile(userCredential.user, { displayName });

      // Update the user object in state
      setUser(userCredential.user);

      return userCredential.user;
    } catch (error) {
      console.error("Registration Error:", error);
      throw error;
    }
  };

  const logout = () => {
    navigate("/login");
    return signOut(auth);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthProvider value={{ createUser, user, logout, signIn }}>
      {children}
    </AuthProvider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
