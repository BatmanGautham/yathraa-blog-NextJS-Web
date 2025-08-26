import React from "react";
import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaDiscord,
  FaTiktok,
} from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white px-4 py-6 rounded-2xl m-5">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-8">
        {/* Left - Logo & Mission */}
        <div className="flex-1 min-w-[220px]">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
            <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-handshake"
                  >
                    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                    <path d="m21 3 1 11h-2" />
                    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                    <path d="M3 4h8" />
            </svg>
            Yathraa
          </h2>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Our mission is to equip modern explorers with cutting-edge,
            functional, and stylish bags that elevate every adventure.
          </p>
          <p className="text-xs text-gray-500">©2025 Yathra. All rights reserved.</p>
        </div>

        {/* Middle - Links */}
        <div className="flex gap-12 flex-1 min-w-[220px]">
          <div>
            <h4 className="text-base mb-2 font-semibold">About</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="cursor-pointer hover:text-white">About Us</li>
              <li className="cursor-pointer hover:text-white">Blog</li>
              <li className="cursor-pointer hover:text-white">Career</li>
            </ul>
          </div>
          <div>
            <h4 className="text-base mb-2 font-semibold">Support</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li className="cursor-pointer hover:text-white">Contact Us</li>
              <li className="cursor-pointer hover:text-white">Return</li>
              <li className="cursor-pointer hover:text-white">FAQ</li>
            </ul>
          </div>
        </div>

        {/* Right - Newsletter & Social */}
        <div className="flex-1 min-w-[260px]">
          <h4 className="text-base mb-2 font-semibold">Get Updates</h4>
          <div className="flex bg-[#111] rounded-lg overflow-hidden mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
            />
            <button className="px-4 py-2 bg-white text-black font-semibold text-sm hover:bg-gray-800 hover:text-white transition-colors">
              Subscribe
            </button>
          </div>

          <div className="flex gap-3 mb-4">
            <a
              href="#"
              className="w-9 h-9 bg-[#222] rounded-full flex items-center justify-center text-white text-base hover:bg-gray-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-[#222] rounded-full flex items-center justify-center text-white text-base hover:bg-gray-600 transition"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-[#222] rounded-full flex items-center justify-center text-white text-base hover:bg-gray-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-[#222] rounded-full flex items-center justify-center text-white text-base hover:bg-gray-600 transition"
            >
              <FaDiscord />
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-[#222] rounded-full flex items-center justify-center text-white text-base hover:bg-gray-600 transition"
            >
              <FaTiktok />
            </a>
          </div>

          <div className="flex gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;