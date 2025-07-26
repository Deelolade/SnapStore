import { SignIn, SignUp } from "@clerk/clerk-react";
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'

const App = () => {
  return (
    <Routes>

<Route path="/sign-in" element={<SignIn />} />
<Route path="/sign-up" element={<SignUp />} />
      <Route path="/" element={<Index />} />
      {/* <Route path="/about" element={<About />} /> */}
    </Routes>
  )
}

export default App
