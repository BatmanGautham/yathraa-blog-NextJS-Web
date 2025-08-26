import React from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "signup";
  onSwitch: (newType: "login" | "signup") => void; // ✅ add switch handler
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type, onSwitch }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="text-white rounded-2xl w-full max-w-md p-8 relative animate-fadeIn bg-white/20 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.37)]">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {type === "login" ? "Welcome Back Traveller!" : "Create an Account 🗺️"}
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4">
          {type === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
          {type === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          )}

          <button
            type="submit"
            className="mt-2 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-md transition"
          >
            {type === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-white mt-6">
          {type === "login" ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => onSwitch(type === "login" ? "signup" : "login")} 
            className="text-indigo-500 font-semibold cursor-pointer hover:underline"
          >
            {type === "login" ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
