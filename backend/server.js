import express from 'express'
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from './controller/clerkWebhooks.js';
import userRouter from './routes/userRoutes.js';
import hotelRouter from './routes/hotelRoutes.js';
import roomRouter from './routes/roomRoutes.js';

// await connectDB();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());

//Middlewares
app.post("/api/clerk", express.raw({ type: 'application/json' }), clerkWebHooks);

app.use(express.json());
// app.use(clerkMiddleware());
// app.post('/webhook', clerkWebHooks);
// app.use("/api/clerk", clerkWebHooks);

app.get('/',(req, res) =>res.send("Hello from server..we are do date"));


app.use('/api/user', userRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.listen(PORT,()=>console.log(`App started...: http://localhost:${PORT}/`))