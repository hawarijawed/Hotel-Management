import express from 'express'
import "dotenv/config";
import cors from 'cors';
import connectDB from './config/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebHooks from './controller/clerkWebhooks.js';

connectDB();
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

app.listen(PORT,()=>console.log(`App started...: http://localhost:${PORT}/`))