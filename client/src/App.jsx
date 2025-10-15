import { SignIn, SignUp } from "@clerk/clerk-react";
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProfilePage from "./pages/ProfilePage";
import AddProduct from "./pages/AddProduct";
import SettingsPage from "./pages/SettingsPage";
import Store from "./pages/Store";

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
      <Route path="/store/:slugName" element={<Store />} />
      <Route path="/store/:slugName/product/:productId" element={<Store />} />
     
    </Routes>
  )
}

export default App
