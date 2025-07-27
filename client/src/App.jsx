import { SignIn, SignUp } from "@clerk/clerk-react";
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>

      {/* authentication */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      {/* landing page */}
      <Route path="/" element={<Index />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
      
    </Routes>
  )
}

export default App
