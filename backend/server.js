import express from 'express'
import "dotenv/config";
import cors from 'cors';
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());

app.get('/',(req, res) =>res.send("Hello from server..we are do date"));

app.listen(PORT,()=>console.log(`App started...: http://localhost:${PORT}/`))