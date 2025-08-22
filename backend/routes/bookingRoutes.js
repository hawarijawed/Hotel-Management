import express from "express";
import { checkAvailabilityApi, createBooking, getHotelBookings, getUserBookings } from "../controller/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { requireAuth } from "@clerk/express";

const bookingRouter = express.Router();

bookingRouter.post('/check-availability', checkAvailabilityApi);
bookingRouter.post('/book', requireAuth(), protect ,createBooking);
bookingRouter.get('/user', requireAuth(), protect, getUserBookings);
bookingRouter.get('/hotel', requireAuth(),protect, getHotelBookings);

export default bookingRouter;