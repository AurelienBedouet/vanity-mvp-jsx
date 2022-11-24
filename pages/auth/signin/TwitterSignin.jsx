import React from "react";
import { FaTwitter } from "react-icons/fa";

const TwitterSignIn = () => {
  // const TwitterLogin = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //     toast.success("Login successful");
  //     router.push("/");
  //   } catch (error) {
  //     toast.error("Login failed");
  //     console.log(error);
  //   }
  // };

  return (
    <button
      // onClick={TwitterLogin}
      className="w-fit text-sm text-white bg-gray-700 font-medium rounded-lg flex items-center py-3 px-4 gap-4 hover:opacity-90"
    >
      <FaTwitter className="text-2xl text-[#1DA1F2]" />
      Sign in with Twitter
    </button>
  );
};

export default TwitterSignIn;
