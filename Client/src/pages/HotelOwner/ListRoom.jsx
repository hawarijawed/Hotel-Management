import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);
  
  return (
    <div>
      <Title align='left' font='outfit' title='Add Rooms' subtitle='Fill in the
       details carefully. Enter accurate room details, pricing, and amenities, in order to enhance 
       the user booking experience' />
       <p className='text-gray-800 mt-4'>All Rooms</p>
    
      <div className='w-full max-w-3xl text-left border border-gray-300 rounded-lg 
        max-h-80 overflow-y-scroll mt-3'>
          <table className='w-full'>
             <thead className='bg-gray-50'>
              <tr>
                <th className='py-3 px-4 text-gray-800 font-medium'>Name</th>
                <th className='py-3 px-4 text-gray-800 font-medium max-sm:hidden'>Facilities</th>
                <th className='py-3 px-4 text-gray-800 font-medium'>Price / Night</th>
                <th className='py-3 px-4 text-gray-800 font-medium text-center'>Action</th>
              </tr>
            </thead>
            <tbody className='text-sm'>
              {
                rooms.map((room, index)=>(
                  <tr key={index}>
                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300 
                    max-sm:hidden'>{room.roomType}</td>
                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{room.amenities.join(', ')}</td>

                    <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{room.pricePerNight}</td>

                    <td className='py-3 px-4 text-red-500 text-sm text-center border-t border-gray-300'>
                      <label className='relative inline-flex items-center cursor-pointer 
                      text-gray-900 gap-3'>
                          <input type="checkbox" className='sr-only peer' checked={room.isAvailable}/>
                          <div className='w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'>
                            <span className='dot absolute right-1 top-1 w-5 h-5 bg-white rounded-full
                             transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                          </div>
                      </label>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
    
      </div>
    </div>
  )
}

export default ListRoom
