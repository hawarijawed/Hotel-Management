import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { registerHotel } from "../controller/hotelController.js";
import { requireAuth } from '@clerk/express';

const hotelRouter = express.Router();

hotelRouter.post('/', requireAuth(),protect, registerHotel)

export default hotelRouter;