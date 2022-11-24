import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../../utils/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GoogleSignIn = () => {
  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed");
      console.log(error);
    }
  };

  return (
    <button
      onClick={GoogleLogin}
      className="w-fit text-sm text-white bg-gray-700 font-medium rounded-lg flex items-center py-3 px-4 gap-4 hover:opacity-90"
    >
      <FcGoogle className="text-2xl" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
