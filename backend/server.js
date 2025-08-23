import express from 'express'
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import clerkWebHooks from './controller/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from './routes/roomRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';
import connectCloudinary from './config/cloudinary.js';

await connectDB();
await connectCloudinary();
const PORT = process.env.PORT || 8000;
const app = express();



// ✅ Configure CORS properly
const allowedOrigins = [
  "http://localhost:5173", // Vite local dev
  "http://localhost:3000", // CRA/Next dev
  "https://hotel-management-frontend-amber.vercel.app" // deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Handle preflight requests explicitly
app.options("*", cors());


//Middlewares
app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebHooks);

app.use(express.json());
// app.use(clerkMiddleware());
// app.post('/webhook', clerkWebHooks);
// app.use("/api/clerk", clerkWebHooks);


app.get('/',(req, res) =>res.send("Server Started Successfully...!!!"));
app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings', bookingRouter);


app.listen(PORT,()=>console.log(`App started...: http://localhost:${PORT}/`))