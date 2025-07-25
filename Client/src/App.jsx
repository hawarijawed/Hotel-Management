import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';


function App() {
  const isOwner = useLocation().pathname.includes("owner");

  return (
    <>
    {
      !isOwner && <Navbar />
    }
    <div className='min-h-[70vh]'>
      <Routes>
        <Route path='/'  element={<Home />}/>
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
