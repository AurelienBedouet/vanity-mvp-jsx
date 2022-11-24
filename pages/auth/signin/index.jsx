import React, { useContext, useEffect } from "react";
import { auth } from "../../../utils/firebase";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserContext } from "../../../context/UserContext";
import EmailSignIn from "./EmailSignIn";
import GoogleSignIn from "./GoogleSignIn";
import TwitterSignIn from "./TwitterSignIn";

const SignIn = () => {
  const router = useRouter();
  const { user, userData } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    } else {
      console.log("login");
    }
  }, [user, router]);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col items-center justify-center gap-6">
      {/* Login with email / password */}
      <EmailSignIn />

      {/* Login with Google / Twitter */}
      <div className="py-4 flex flex-wrap gap-6">
        <GoogleSignIn />
        <TwitterSignIn />
      </div>
    </div>
  );
};

export default SignIn;
