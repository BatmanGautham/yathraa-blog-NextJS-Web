import React, { useEffect, useRef } from "react";
import { Search, Globe, Menu, X } from "lucide-react";
import AuthModal from "./LoginSignupCard";

import authorImage from '../../public/author1.jpg';
import Link from "next/link";

type HeroProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  suggestions?: string[];
};

const Hero: React.FC<HeroProps> = ({ searchTerm, setSearchTerm, suggestions = [] }) => {
  
  const [authType, setAuthType] = React.useState<"login" | "signup" | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Dropdown visibility states
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [sidebarDropdown, setSidebarDropdown] = React.useState(false);

  const images = ["/img1.jpg", "/img2.jpg", "/img3.jpg", "/img4.jpg"];

  // Refs for click outside detection(to close dropdown)
  const searchRef = useRef<HTMLDivElement>(null);
  const sidebarSearchRef = useRef<HTMLDivElement>(null);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Sidebar escape key & body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };

    if (sidebarOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Click out, for desktop search
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Click out, for sidebar search
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sidebarSearchRef.current && !sidebarSearchRef.current.contains(e.target as Node)) {
        setSidebarDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Filtered suggestions
  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[95vh] rounded-2xl overflow-hidden mx-5 my-5 text-white bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${images[current]})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/5 pointer-events-none z-0" />

        {/* Mobile Menu Button */}
        <button
          className="hidden max-xl:flex flex-col justify-center items-center w-11 h-11 bg-white/15 border border-white/25 rounded-xl cursor-pointer transition-all duration-300 ease-in-out absolute top-5 left-5 z-10 backdrop-blur-md hover:bg-white/25 hover:scale-105"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Desktop Navbar */}
        <nav className="absolute top-0 left-0 right-0 w-full z-30 p-3.5 px-8">
          <div className="max-xl:hidden grid grid-cols-[auto_1fr_auto] items-center gap-3">
            {/* Left: Logo + Links */}
            <div className="flex items-center gap-4 min-w-0">
              <Link
                href="/"
                className="inline-flex items-center text-white no-underline font-bold text-2xl"
              >
                <span className="inline-flex items-center justify-center w-12 h-12">
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
                </span>
                <span className="tracking-wide">Yathra</span>
              </Link>

              <ul className="list-none pl-4 m-0 flex gap-8 flex-nowrap mr-4">
                {["Hotel", "Flight", "Train", "Travel", "Car Rental"].map((item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-white font-medium text-lg border-b-2 border-transparent hover:border-indigo-500 transition duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Center: Search */}
            <div className="relative w-full max-w-[280px] mx-auto" ref={searchRef}>
              <form
                className="flex items-center text-white bg-white/[0.18] border border-white/[0.28] rounded-lg py-3 px-2.5 w-full focus-within:border-indigo-500 focus-within:bg-black/30 transition duration-200 shadow-sm"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowDropdown(false);

                  // Scroll to blog section
                  const blogSection = document.getElementById("blog-section");
                  if (blogSection) {
                    blogSection.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
              >
                <input
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-white/85"
                  type="search"
                  placeholder="Search destination..."
                  aria-label="Search blog posts here"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                />
                <button
                  className="inline-flex items-center justify-center w-10 h-7.5 border-0 rounded-2xl cursor-pointer bg-white/0 text-white hover:bg-white/34 hover:scale-110"
                  type="submit"
                >
                  <Search size={18} />
                </button>
              </form>

              {showDropdown && filteredSuggestions.length > 0 && (
                <ul className="custom-scrollbar absolute top-full left-0 right-0 bg-indigo-500/10 text-white rounded-md mt-1 max-h-60 overflow-y-auto z-50 shadow-lg backdrop-blur-md border border-indigo-500/20">
                  {filteredSuggestions.map((s, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:text-indigo-500"
                      onClick={() => {
                        setSearchTerm(s);
                        setShowDropdown(false);

                        // Also scroll to blog section if suggestion is clicked
                        const blogSection = document.getElementById("blog-section");
                        if (blogSection) {
                          blogSection.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Right: Language + Auth */}
            <div className="flex items-center gap-2 justify-end">
              <button className="inline-flex items-center gap-0.5 p-1 bg-white/15 border border-white/20 rounded-full backdrop-blur-md hover:bg-white/25 hover:scale-105">
                <Globe className="w-8 h-8" />
              </button>
              <span className="font-semibold">EN</span>
              <button
                className="text-white font-semibold ml-6 text-xl border-b-2 border-transparent hover:border-indigo-500 transition duration-200"
                onClick={() => setAuthType("login")}
              >
                Log In
              </button>
              <button
                className="no-underline text-gray-900 bg-white rounded-lg py-3.5 px-3.5 font-bold text-xl ml-6 hover:brightness-95 cursor-pointer hover:bg-indigo-400 hover:text-white transition duration-300"
                onClick={() => setAuthType("signup")}
              >
                Sign Up
              </button>
            </div>

            
          </div>
        </nav>

        {/* Hero Content Wrapper */}
        <div className="absolute left-8 right-8 bottom-20 z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          
          {/* Left: Hero text */}
          <div className="max-w-[720px] text-left">
            <Link
              href="/destination"
              className="inline-block bg-gradient-to-br from-gray-500/[0.482] to-white/34 py-2.5 px-3.5 rounded-full mb-4 text-xl shadow-lg backdrop-blur-lg transition-transform ease-in-out duration-500 cursor-pointer hover:scale-105"
            >
              Destination
            </Link>

            {/* Mobile Author (only visible on mobile, under the tag) */}
            <div className="flex items-center gap-3 my-3 mb-6 lg:hidden">
              <div
                className="w-9 h-9 flex-shrink-0 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${authorImage.src})` }}
              />
              <div className="flex flex-col gap-0.5">
                <strong className="text-lg leading-tight m-0">Bruce Wayne</strong>
                <p className="text-sm m-0 opacity-90 tracking-wide">22 Aug 2025 • 8 mins read</p>
              </div>
            </div>

            <h1 className="text-[clamp(28px,4vw,40px)] my-2 leading-[1.15] drop-shadow-lg">
              Exploring the Wonders of Hiking
            </h1>
            <p className="max-w-[540px] text-lg mb-4.5 opacity-95 drop-shadow-lg">
              An iconic landmark, this post unveils the secrets that make these destination a traveler&apos;s paradise.
            </p>

            {/* Carousel Dots */}
            <div className="flex gap-2.5 mt-6">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
                    idx === current ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                  }`}
                  onClick={() => setCurrent(idx)}
                />
              ))}
            </div>
          </div>

          {/* Right: Author (only visible on lg+) */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">

            <div
              className="w-20 h-20 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${authorImage.src})` }}
            />
              <span className="font-bold text-2xl">Bruce Wayne</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl opacity-90">22 Aug 2025 • 8 mins read</span>
            </div>
          </div>
        </div>

      </section>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/[0.684] z-[998] backdrop-blur-sm transition-all duration-300 ease-in-out ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <nav
       className={`fixed top-0 w-[380px] h-screen bg-gradient-to-br from-indigo-400/[0.65] to-purple-500/[0.65] z-[999] flex flex-col shadow-xl transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] max-md:w-screen ${
        sidebarOpen ? "right-0" : "right-[-380px] max-md:right-[-100vw]"}`}>

        <div className="flex justify-between items-center py-6 px-7 border-b border-white/15">
          <Link
            href="/"
            className="inline-flex items-center text-white font-bold text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="inline-flex items-center justify-center w-12 h-12">
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
            </span>
            <span className="tracking-wide">Yathra</span>
          </Link>

          <button
            className="text-white p-2.5 rounded-full hover:bg-white/15 hover:rotate-90"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Search */}
        <div className="relative py-6 px-7 border-b border-white/15" ref={sidebarSearchRef}>
          <div className="flex items-center bg-white/15 border border-white/20 rounded-[25px] py-3.5 px-4.5 backdrop-blur-md focus-within:bg-white/25 focus-within:border-white/40">
            <input
              type="search"
              placeholder="Search destination..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSidebarDropdown(true);
              }}
              onFocus={() => setSidebarDropdown(true)}
              className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder:text-white/70 pl-4"
            />
            <button
              type="submit"
              aria-label="Search"
              className="text-white p-1.5 ml-3 rounded-full hover:bg-white/20"
            >
              <Search size={18} />

            </button>
          </div>

          {sidebarDropdown && filteredSuggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-indigo-500/10 backdrop-blur-md rounded-b-xl mt-1 overflow-hidden z-20">
              {filteredSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-3 text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(s);
                    setSidebarOpen(false);
                    setSidebarDropdown(false);

                    // Scroll to blog section when selecting from sidebar
                    const blogSection = document.getElementById("blog-section");
                    if (blogSection) {
                      blogSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Links */}
        <ul className="flex-1 flex flex-col p-4 gap-2">
          {["Hotel", "Flight", "Train", "Travel", "Car Rental"].map((link) => (
            <li key={link}>
              <Link
                href="/"
                className="flex items-center text-white text-xl font-medium py-4 px-7 border-l-4 border-transparent hover:bg-white/[0.35] hover:border-l-white hover:translate-x-2 transition-all"
                onClick={() => setSidebarOpen(false)}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="py-6 px-7 border-t border-white/15">
          <div className="flex flex-col gap-4 mb-6">
            <button
              onClick={() => setAuthType("login")}
              className="text-white py-3.5 px-6 rounded-[25px] font-semibold border-2 border-white/30 hover:bg-white/15"
            >
              Log In
            </button>
            <button
              onClick={() => setAuthType("signup")}
              className="bg-white text-indigo-500 py-3.5 px-6 rounded-[25px] font-bold hover:-translate-y-0.5 hover:shadow-lg"
            >
              Sign Up
            </button>
          </div>
          <div className="flex justify-center">
            <button className="flex items-center gap-2.5 bg-white/15 border border-white/20 text-white py-3 px-5 rounded-[22px] hover:bg-white/25 hover:scale-105">
              <Globe size={20} />
              <span>English</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authType !== null}
        onClose={() => setAuthType(null)}
        type={authType || "login"}
        onSwitch={(newType) => setAuthType(newType)}
      />
    </>
  );
};

export default Hero;