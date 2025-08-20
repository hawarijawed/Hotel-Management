import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ListRoom = () => {
  const [rooms, setRooms] = useState([]);
  const { axios, getToken, user } = useAppContext();

  //Fetch rooms for hotel owner
  const fetchRoom = async () => {
    try {
      const { data } = await axios.get('/api/rooms', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if (data.success) {
        setRooms(data.rooms);
        console.log("total rooms: ",rooms.length);
        
      }
      else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  // Toggle availability of room
  const toggleAvailability = async (roomId) => {
    const { data } = await axios.post('/api/rooms/toggle-availability', { roomId }, {
      headers: { Authorization: `Bearer ${await getToken()}` }
    });
    
    if (data.success) {
      toast.success(data.message);
      fetchRoom();
    }
    else {
      toast.error(data.message);
    }
  }
  useEffect(() => {
    if (user) {
      fetchRoom();
    }
  }, [user])
  return (
    <div>
      <Title align='left' font='outfit' title='Rooms Listing' subtitle='View, edit, or manage all listed rooms. 
      Keep the information up to date to provide the best experience for users.' />
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
              rooms.map((room, index) => (
                <tr key={index}>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300 
                    max-sm:hidden'>{room.roomType}</td>
                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{room.amenities.join(', ')}</td>

                  <td className='py-3 px-4 text-gray-700 border-t border-gray-300'>{room.pricePerNight}</td>

                  <td className='py-3 px-4 text-red-500 text-sm text-center border-t border-gray-300'>
                    <label className="relative inline-flex cursor-pointer items-center gap-3 text-gray-900">
                      <input onChange={() =>toggleAvailability(room._id)} type="checkbox" className="peer sr-only" 
                      checked={room.isAvailable}/>
                      <div className="peer h-7 w-12 rounded-full bg-slate-300 ring-offset-1 transition-colors duration-200 peer-checked:bg-indigo-600 peer-focus:ring-2 peer-focus:ring-indigo-500"></div>
                      <span className="dot absolute top-1 left-1 h-5 w-5 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                      
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
