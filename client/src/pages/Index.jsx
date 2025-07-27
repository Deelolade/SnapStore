import Navbar from '@/components/Navbar'
import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const Index = () => {
  return (
    <div>
      <Navbar/>
      <h2 className='text-5xl'>hello world </h2>
      <h2 className='text-5xl'>landing page</h2>
    </div>
  )
}

export default Index
