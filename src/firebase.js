// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5NvP6zqP4uGOkNOD7C0LZ9-0OF9NPngA",
  authDomain: "statdash-73260.firebaseapp.com",
  projectId: "statdash-73260",
  storageBucket: "statdash-73260.appspot.com",
  messagingSenderId: "967928874962",
  appId: "1:967928874962:web:f9758ca5a60ad5a23daa0b",
  measurementId: "G-MHFW42TEH6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dataRef = getDatabase(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
