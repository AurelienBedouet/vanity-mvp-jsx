import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "../utils/firebase";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const router = useRouter();
  const { user, userData } = useContext(UserContext);

  const SignOut = () => {
    auth.signOut();
    toast.success("Successfully logged out!");
    router.push("/");
  };

  return (
    <nav className="h-[72px] border-b shadow-lg">
      <div className="h-full max-w-7xl w-[95%] 2xl:w-full mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold tracking-widest text-gray-600"
        >
          Vanity
        </Link>

        {!user && (
          <Link href={"/auth/signin"} className="app__buttons">
            Sign In
          </Link>
        )}

        {user && (
          <ul className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="app__buttons">Dashboard</button>
            </Link>
            <button className="app__buttons" onClick={SignOut}>
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={userData?.avatar || user?.photoURL || "/assets/hacker.png"}
                width={40}
                height={40}
                alt={
                  userData?.username || user?.displayName || "profile picture"
                }
                className="aspect-square rounded-full cursor-pointer"
              />
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
