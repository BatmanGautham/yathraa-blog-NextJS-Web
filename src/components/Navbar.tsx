import React, { useEffect, useRef } from "react";
import { Menu, X, Globe, Search } from "lucide-react";
import Link from "next/link";

type NavProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  suggestions?: string[];
  setAuthType: React.Dispatch<React.SetStateAction<"login" | "signup" | null>>;
};

const Nav: React.FC<NavProps> = ({
  searchTerm,
  setSearchTerm,
  suggestions = [],
  setAuthType,
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [sidebarDropdown, setSidebarDropdown] = React.useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const sidebarSearchRef = useRef<HTMLDivElement>(null);

  // click outside desktop search
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // click outside sidebar search
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sidebarSearchRef.current && !sidebarSearchRef.current.contains(e.target as Node)) {
        setSidebarDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToBlog = () => {
    const el = document.getElementById("blog-section");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="w-full z-30 p-4 px-8 relative">
        <div className="max-xl:hidden grid grid-cols-[auto_1fr_auto] items-center gap-6">
          {/* Left: Logo + Links */}
          <div className="flex items-center gap-6">
              <Link href="/" className="text-white text-2xl font-bold flex items-center gap-2">
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
              </Link>


            <ul className="flex gap-6">
              {["Home", "Hotel", "Flight", "Train", "Travel", "Car Rental"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/"
                      className="text-white font-medium text-lg border-b-2 border-transparent hover:border-indigo-500"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Center: Search */}
          <div
            className="relative max-w-md w-full mx-auto"
            ref={searchRef}
          >
            <form
              className="flex items-center text-white bg-white/15 border border-white/20 rounded-full py-2.5 px-3 backdrop-blur-md focus-within:bg-white/25 focus-within:border-white/40 transition"
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                setShowDropdown(false);
                scrollToBlog();
              }}
            >
              <input
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/80 px-2 text-base"
                type="search"
                placeholder="Search destination..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              <button
                className="inline-flex items-center justify-center p-1.5 rounded-full hover:bg-white/20"
                type="submit"
              >
                <Search size={18} />
              </button>
            </form>

            {showDropdown && filteredSuggestions.length > 0 && (
              <ul className="absolute top-full left-0 right-0 bg-indigo-500/10 text-white rounded-md mt-1 max-h-60 overflow-y-auto z-50 shadow-lg backdrop-blur-md border border-indigo-500/20">
                {filteredSuggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:text-indigo-600 transition"
                    onClick={() => {
                      setSearchTerm(s);
                      setShowDropdown(false);
                      scrollToBlog();
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right Buttons */}
          <div className="flex items-center gap-4 justify-end">
            <button className="flex items-center gap-1 text-white bg-white/15 rounded-full p-1 hover:bg-white/25">
              <Globe size={20} /> EN
            </button>
            <button
              className="text-white font-semibold"
              onClick={() => setAuthType && setAuthType("login")}
            >
              Log In
            </button>
            <button
              className="bg-white text-indigo-500 px-4 py-2 rounded font-bold hover:brightness-95"
              onClick={() => setAuthType("signup")}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="hidden max-xl:flex absolute top-4 left-4 p-2 bg-white/15 rounded-lg hover:bg-white/25"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={24} className="text-white" />
        </button>
      </nav>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/[0.684] z-[998] backdrop-blur-sm transition-all duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <nav
       className={`fixed top-0 w-[380px] h-screen bg-gradient-to-br from-indigo-400/[0.65] to-purple-500/[0.65] z-[999] flex flex-col shadow-xl transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] max-md:w-screen ${
        sidebarOpen ? "right-0" : "right-[-380px] max-md:right-[-100vw]"}`}>

        <div className="flex justify-between items-center py-4 px-7 border-b border-white/15">
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
            <span className="tracking-wide">Yathraa</span>
          </Link>

          <button
            className="text-white p-3 rounded-full hover:bg-white/15 hover:rotate-90"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Search */}
        <div
          className="relative py-2 px-7 border-b border-white/15"
          ref={sidebarSearchRef}
        >
          <div className="flex items-center bg-white/15 border border-white/20 rounded-[25px] py-3 px-4 backdrop-blur-md">
            <input
              type="search"
              placeholder="Search destination..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSidebarDropdown(true);
              }}
              onFocus={() => setSidebarDropdown(true)}
              className="flex-1 bg-transparent outline-none text-white text-base placeholder:text-white/70 pl-4"
            />
            <button
              type="submit"
              aria-label="Search"
              className="text-white p-1.5 ml-3 rounded-full hover:bg-white/20"
              onClick={scrollToBlog}
            >
              <Search size={18} />
            </button>
          </div>

          {sidebarDropdown && filteredSuggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-indigo-500/90 backdrop-blur-md rounded-b-xl mt-1 overflow-hidden z-20">
              {filteredSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-3 text-white hover:bg-white/20 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(s);
                    setSidebarOpen(false);
                    setSidebarDropdown(false);
                    scrollToBlog();
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sidebar Links */}
        <ul className="flex-1 flex flex-col p-4 gap-2">
          {["Home", "Hotel", "Flight", "Train", "Travel", "Car Rental"].map(
            (link) => (
              <li key={link}>
                <Link
                  href="/"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center text-white text-xl font-medium py-4 px-7 border-l-4 border-transparent hover:bg-white/[0.35] hover:border-l-white hover:translate-x-2 transition-all"
                >
                  {link}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Sidebar Footer */}
        <div className="py-6 px-7 border-t border-white/15 flex flex-col gap-4">
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
      </nav>
    </>
  );
};

export default Nav;
