import React, { useState } from "react";
import AuthModal from "./AuthModal";

export default function LandingPage() {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-4 ">
        <div className="text-xl sm:text-2xl font-bold tracking-wide ">
          TinyTrail
        </div>

        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={() => setOpenAuth(true)}
            className="btn btn-ghost btn-sm sm:btn-md"
          >
            Login
          </button>

          <button
            onClick={() => setOpenAuth(true)}
            className="btn btn-primary btn-sm sm:btn-md rounded-none"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 sm:px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Short links
          <br className="hidden sm:block" /> Big Impact.
        </h1>

        <p className="max-w-xl text-base sm:text-lg text-base-content/70 mb-6">
          Create clean, powerful short links that are easy to share, track, and
          remember.
        </p>

        {/* CTA BUTTON — placed RIGHT after description */}
        <button
          onClick={() => setOpenAuth(true)}
          className="btn btn-primary btn-md sm:btn-lg rounded-none"
        >
          Get Started
        </button>
      </main>

      {/* Auth Modal */}
      {openAuth && <AuthModal onClose={() => setOpenAuth(false)} />}
    </div>
  );
}
