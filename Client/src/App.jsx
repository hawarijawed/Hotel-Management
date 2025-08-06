import { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/HotelOwner/Layout';


function App() {
  const isOwner = useLocation().pathname.includes("owner");

  return (
    <>
    {
      !isOwner && <Navbar />
    }
    {false && <HotelReg />}
    <div className='min-h-[70vh]'>
      <Routes>
        <Route path='/'  element={<Home />}/>
        <Route path='/rooms' element={<AllRooms />}/>
        <Route path='/rooms/:id' element={<RoomDetails />} />
        <Route path='/my-bookings' element={<MyBookings />}/>
        <Route path='/owner' element={<Layout />}>

        </Route>
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
