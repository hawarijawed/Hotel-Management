import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home';


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
    </>
  )
}

export default App
