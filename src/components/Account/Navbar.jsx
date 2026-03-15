import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const handleSignout = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar bg-base-100 text-base-content px-4 sm:px-8 border-b border-base-300">
      
      {/* Logo */}
      <div className="flex-1">
        <span className="text-xl sm:text-2xl font-bold tracking-wide">
          TinyTrail
        </span>
      </div>

      {/* Right Side Buttons */}
      <div className="flex gap-2 sm:gap-3">
        <button className="btn btn-ghost btn-sm sm:btn-md">
          Links
        </button>

        <button
          onClick={handleSignout}
          className="btn btn-primary btn-sm sm:btn-md rounded-none"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;