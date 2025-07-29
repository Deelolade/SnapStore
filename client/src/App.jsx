import { SignIn, SignUp } from "@clerk/clerk-react";
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProfilePage from "./pages/ProfilePage";
import AddProduct from "./pages/AddProduct";
import SettingsPage from "./pages/SettingsPage";

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
      <Route path="/products" element={<Products />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/add-products" element={<AddProduct />} />
      <Route path="/settings" element={<SettingsPage />} />
      
    </Routes>
  )
}

export default App
