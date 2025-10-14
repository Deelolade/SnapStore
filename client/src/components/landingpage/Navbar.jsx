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

  const navigate = useNavigate();
  const { user, isSignedIn } = useUser();

  // console.log(user?.fullName.toUpperCase(), user?.primaryEmailAddress.emailAddress);
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
          <a href="#" className="text-3xl font-bold text-gray-900">
            SnapStore
          </a>
          {!isSignedIn && (
            <div className="flex space-x-8 items-center">
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
        <div className="flex items-center space-x-4">
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
      </nav>
    </header>
  );
};

export default Navbar;
