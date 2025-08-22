import Booking from "../models/Booking.js"
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
// checking availability of room

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkInDate },
            checkOutDate: { $gte: checkOutDate }
        });

        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        console.log("Error: ", error.message);

    }
}

// Check availability api
export const checkAvailabilityApi = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to create new booking
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        const user = req.user._id;
        //console.log({room, checkInDate, checkOutDate, isAvailable, guests,user});
        
        if (!isAvailable) {
            return res.json({ success: false, message: "Room is not available" });
        }

        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalPrice *= nights;

        const booking = await Booking.create({
            user,
            room,
            hotel: roomData.hotel._id,
            checkInDate,
            checkOutDate,
            guest: +guests,
            totalPrice,
        });
        // console.log("Booking successfull");
        
        res.json({ success: true, message: "Booking has been made" });
    } catch (error) {
        console.log(error.message);

        res.json({ success: false, message: "Failed to create booking" })
    }
}

//get all bookings for a user

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({ user }).populate("room hotel").sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: "Failed to fetch all bookings" })
    }
}

export const getHotelBookings = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth().userId });
        if (!hotel) {
            return res.json({ success: false, messae: "No hotel found" });
        }

        const bookings = await Booking.find({ hotel: hotel._id }).populate("room hote user").sort({ createdAt: -1 });

        const totalBookings = bookings.length;
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);
        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } })
    } catch (error) {
        res.json({success:false, message:"Failed to fetch booking"})
    }
}