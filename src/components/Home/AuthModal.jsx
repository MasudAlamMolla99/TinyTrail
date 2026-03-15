import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

const AuthModal = ({ onClose }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="card w-full max-w-sm bg-base-100 shadow-2xl 
                        animate-modal-in relative">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
          >
            ✕
          </button>

          <div className="card-body">
            <h2 className="text-2xl font-bold text-center">
              {isLogin ? "Welcome Back 👋" : "Create Account ✨"}
            </h2>

            <div className="space-y-4 mt-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                value={form.email}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered w-full"
                value={form.password}
                onChange={handleChange}
              />

              <button
                onClick={handleAuthSubmit}
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner" />
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {error && (
              <p className="text-error text-sm text-center mt-2">{error}</p>
            )}

            <p className="text-center text-sm mt-4 text-base-content/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span
                className="link link-primary font-semibold cursor-pointer"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up" : "Sign in"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
