import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  SignInButton,
  SignUpButton,
  useUser,
  SignedIn,
  useClerk,
} from "@clerk/clerk-react";
import SyncUsers from "../SyncUsers";

const Navbar = () => {
  const lastYRef = useRef(window.scrollY);
  const [hidden, setHidden] = useState(false);
  const [scrolledTop, setScrolledTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  const navlinks = [
    { name: "Features", to: "#features" },
    { name: "How It Works", to: "#how-it-works" },
    { name: "Pricing", to: "#pricing" },
    { name: "For Sellers", to: "/sign-up" },
    { name: "Login", to: "/sign-in" },
  ];
  useEffect(() => {
    if (isSignedIn) {
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolledTop(currentY < 10);

      if (currentY > lastYRef.current && currentY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed w-screen  z-50 transition-all ease-in-out duration-500 ${hidden ? "-translate-y-full" : "translate-y-0"
        } 
        ${scrolledTop ? "bg-transparent" : "bg-white shadow-xl"}
      `}
    >
      <nav className="flex justify-between items-center h-[8vh] px-6 py-4 bg-white  max-w-6xl mx-auto">
        {/* Left - Logo and first 3 links */}
        <div className="flex items-center justify-between w-[60%]">
          <a href="#" className="text-lg 2xl:text-2xl font-bold text-gray-900">
            SnapStore
          </a>
          {!isSignedIn && (
            <div className="hidden md:flex space-x-4 2xl:space-x-8 items-center">
              {navlinks.slice(0, 3).map((link, idx) => (
                <a
                  key={idx}
                  href={link.to}
                  className=" text-lg text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Right - Auth buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <>
            {!isSignedIn &&
              navlinks.slice(3).map((link, idx) => {
                if (link.name === "For Sellers") {
                  return (
                    <SignUpButton
                      key={idx}
                      mode="modal"
                      redirecturl="/dashboard"
                    >
                      <button className="bg-green text-white px-4 py-2 rounded-sm  font-semibold hover:bg-green/90">
                        {link.name}
                      </button>
                    </SignUpButton>
                  );
                } else if (link.name === "Login") {
                  return (
                    <SignInButton
                      key={idx}
                      mode="modal"
                      redirecturl="/dashboard"
                    >
                      <button className="bg-orange text-white px-4 py-2 rounded-sm  font-semibold hover:bg-orange/90">
                        {link.name}
                      </button>
                    </SignInButton>
                  );
                }
                return null;
              })}
            {isSignedIn && (
              <SignedIn>
                <SyncUsers />
              </SignedIn>
            )}
          </>
        </div>
        <button className="md:hidden flex flex-col justify-center items-center space-y-1 hover:bg-slate-100 p-2 rounded-md" onClick={() => setMenuOpen(prev => !prev)}>
          <span className={`w-5 h-[2px] bg-black transition-all ease-in-out duration-500 ${menuOpen && "rotate-45 translate-y-1.5  "}`}></span>
          <span className={`w-5 h-[2px] bg-black transition-all ease-in-out duration-500 ${menuOpen && "-rotate-45  "}`}></span>
          <span className={`w-5 h-[2px] bg-black transition-all ease-in-out duration-500 ${menuOpen && "opacity-0"}`}></span>
        </button>
      </nav>
      <div
        className={`${menuOpen ? "opacity-100 translate-x-0 pointer-events-auto" : 'opacity-0 -translate-x-64 pointer-events-none'} transition-all duration-500 ease-in-out origin-top bg-white absolute top-[8vh] md:top-[10vh] h-[92vh] w-full md:hidden flex flex-col justify-start items-center pt-10 space-y-6`}>
        <ul className=" space-y-6 text-center">
          <li><a href="#features" onClick={() => setMenuOpen(prev => !prev)} className="text-4xl font-semibold">Features</a></li>
          <li><a href="#how-it-works" onClick={() => setMenuOpen(prev => !prev)} className="text-4xl font-semibold">How it works</a></li>
          <li><a href="#pricing" onClick={() => setMenuOpen(prev => !prev)} className="text-4xl font-semibold">Pricings</a></li>
          <li><a href="#" onClick={() => setMenuOpen(prev => !prev)} className="text-4xl font-semibold">Blog</a></li>
        </ul>
        <SignInButton
          mode="modal"
          redirecturl="/dashboard"
        >
          <button
            onClick={() => setMenuOpen(prev => !prev)}
           className=" bg-orange text-white text-sm font-medium py-2 px-4 rounded-sm">
            Sign Up
          </button>
        </SignInButton>
      </div>
    </header>
  );
};

export default Navbar;
