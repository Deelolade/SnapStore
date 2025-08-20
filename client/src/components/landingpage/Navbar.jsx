import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignInButton, SignUpButton, useUser, SignedIn, useClerk } from '@clerk/clerk-react'
import SyncUsers from '../SyncUsers'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, isSignedIn } = useUser()

  console.log(user?.fullName.toUpperCase(), user?.primaryEmailAddress.emailAddress);
  const navlinks = [
    { name: "Features", to: "/features" },
    { name: "How It Works", to: "/how-it-works" },
    { name: "Pricing", to: "/pricing" },
    { name: "For Sellers", to: "/sign-up" },
    { name: "Login", to: "/sign-in" }        
  ]
  useEffect(() => {

    if (isSignedIn) {
      navigate("/dashboard")
    }
  }, [isSignedIn, navigate])
  return (

    <div className="w-full h-[8vh] shadow-md fixed z-50 bg-white">
      <nav className='flex justify-between items-center h-[8vh] px-6 py-4 bg-white  max-w-6xl mx-auto'>
        {/* Left - Logo and first 3 links */}
        <div className="flex items-center justify-between w-[60%]">
          <h2 className='text-3xl font-bold text-gray-900'>SnapStore</h2>
          {!isSignedIn && (
            <div className="flex space-x-8 items-center">
              {navlinks.slice(0, 3).map((link, idx) => (
                <Link key={idx} to={link.to} className="text-gray-600 hover:text-gray-900 transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right - Auth buttons */}
        <div className="flex items-center space-x-4">
          <>
            {!isSignedIn && (
              navlinks.slice(3).map((link, idx) => {
                if (link.name === "For Sellers") {
                  return (
                    <SignUpButton key={idx} mode="modal" redirecturl="/dashboard">
                      <button className="bg-green text-white px-4 py-2 rounded-3xl  font-medium hover:bg-green/90">
                        {link.name}
                      </button>
                    </SignUpButton>
                  )
                } else if (link.name === "Login") {
                  return (
                    <SignInButton key={idx} mode="modal" redirecturl="/dashboard" >
                      <button className="bg-orange text-white px-4 py-2 rounded-3xl  font-medium hover:bg-orange/90">
                        {link.name}
                      </button>
                    </SignInButton>
                  )
                }
                return null
              })
            )
            }
            {isSignedIn && (
              <SignedIn>
                <SyncUsers />
              </SignedIn>
            )}
          </>

        </div>
      </nav>
    </div>
  )
}

export default Navbar
