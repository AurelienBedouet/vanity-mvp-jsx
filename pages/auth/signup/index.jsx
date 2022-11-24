import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/router";
import { UserContext } from "../../../context/UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const router = useRouter();
  const { user, userData } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created with success!");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/profile");
    } else {
      console.log("login");
    }
  }, [user, router]);

  return (
    <div className="h-[calc(100vh-120px)] w-full max-w-md mx-auto flex flex-col items-center justify-center">
      <h1 className="text-2xl font-medium">Sign Up</h1>

      {/* Error Handling */}
      {error ? <p className="bg-red-300 p-3 my-2">{error}</p> : null}

      {/* Start Form */}
      <form onSubmit={handleSubmit} className="w-full">
        {/* Email */}
        <div className="my-4">
          <label>Email</label>
          <div className="my-2 w-full relative rounded-lg shadow-xl">
            <input
              onChange={e => setEmail(e.target.value)}
              className="w-full p-2 bg-primary border border-input rounded-lg"
              type="email"
            />
            <AiOutlineMail className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Password */}
        <div className="my-4">
          <label>Password</label>
          <div className="my-2 w-full relative rounded-lg shadow-xl">
            <input
              onChange={e => setPassword(e.target.value)}
              className="w-full p-2 bg-primary border border-input rounded-lg"
              type="password"
            />
            <AiFillLock className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="app__buttons w-full my-2 p-2 shadow-xl"
        >
          Sign Up
        </button>
      </form>
      {/* End Form */}

      <div className="flex gap-4 items-center">
        <p className="my-4 font-light">Already have an account ?</p>
        <Link href="/auth/signin" className="text-gray-700 font-medium">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Signup;
