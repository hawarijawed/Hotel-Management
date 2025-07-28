import React from 'react'
import { assets, facilityIcons, roomsDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import StarRating from '../components/StarRating';

const AllRooms = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between
    pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>
    {/* Left side of page */}
    <div>
        <div className='flex flex-col items-start text-left'>
            <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
            <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Take advantage of our limited time offers and special our packages to enhance your stay and create unforgattable memories.</p>
        </div>

        {roomsDummyData.map((room,index)=>(
            <div className='flex flex-col md:flex-row items-start py-10 gap-6
            border-b border-gray-300 last:pb-30 last:border-0' key={room._id}>
                <img src={room.images[0]} alt="hotel-room" key={index} title='View Room Details'
                className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover cursor-pointer'
                onClick={()=> {navigate(`/rooms/${room._id}`), scrollTo(0,0)}}/>
                <div className='md:w-1/2 flex flex-col gap-2'>
                    <p className='text-gray-500'>{room.hotel.city}</p>
                    <p className='text-gray-800 text-3xl font-playfair 
                    cursor-pointer'
                    onClick={()=>{navigate(`/roomS/${room._id}`), scrollTo(0,0)}}>{room.hotel.name}</p>
                    <div className='flex items-center'>
                        <StarRating />
                        <p className='ml-2'>150+ Reviews</p>
                    
                    </div>
                    <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                        <img src={assets.locationIcon} alt="location-icon" />
                        <span>{room.hotel.address}</span>
                    </div>
                    {/* Room facilities */}
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index)=>(
                            <div className='flex items-center gap-0.5 px-3 py-2 rounded-lg bg-[#F5F5FF]/80' key={index}>
                                <img src={facilityIcons[item]} alt="item" className='w-5 h-5'/>
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>

                    {/* Room Price */}
                    <div>
                        <p className='text-xl font-medium text-gray-700'>${room.pricePerNight}/night</p>
                    </div>
                </div>
            </div>
        ))}
    </div>

    {/* Filter section of page */}
    <div>

    </div>
    </div>
  )
}

export default AllRooms
