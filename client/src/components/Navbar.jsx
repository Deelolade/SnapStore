import React from 'react'
import { Link } from 'react-router-dom'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const { isSignedIn } = useUser()

  const navlinks = [
    { name: "Features", to: "/features" },
    { name: "How It Works", to: "/how-it-works" },
    { name: "Pricing", to: "/pricing" },
    { name: "For Sellers", to: "/sign-up" }, // replaced with SignUpButton
    { name: "Login", to: "/sign-in" }        // replaced with SignInButton
  ]

  return (
    <div className="w-full shadow-sm">
      <nav className='flex justify-between items-center px-6 py-4 bg-white shadow-sm max-w-6xl mx-auto'>
        {/* Left - Logo and first 3 links */}
        <div className="flex items-center space-x-8">
          <h2 className='text-3xl font-bold text-gray-900'>SnapStore</h2>
          <div className="flex space-x-6 items-center">
            {navlinks.slice(0, 3).map((link, idx) => (
              <Link key={idx} to={link.to} className="text-gray-600 hover:text-gray-900 transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right - Auth buttons */}
        <div className="flex items-center space-x-4">
          {!isSignedIn ? (
            navlinks.slice(3).map((link, idx) => {
              if (link.name === "For Sellers") {
                return (
                  <SignUpButton key={idx} mode="modal">
                    <button className="bg-green text-white px-4 py-1 rounded-3xl text-sm font-medium hover:bg-green/90">
                      {link.name}
                    </button>
                  </SignUpButton>
                )
              } else if (link.name === "Login") {
                return (
                  <SignInButton key={idx} mode="modal">
                    <button className="bg-orange text-white px-4 py-1 rounded-3xl text-sm font-medium hover:bg-orange/90">
                      {link.name}
                    </button>
                  </SignInButton>
                )
              }
              return null
            })
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
