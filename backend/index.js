import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRouter from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/booking.js';

dotenv.config()
const app = express()
const port = process.env.PORT || 8000

app.use(cors({
  origin: process.env.PORT_FE,
  credentials: true
}));


// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.use(authRouter)
app.use(tourRoute)
app.use(userRoute)
app.use(reviewRoute)
app.use(bookingRoute)

app.listen(port, ()=> {
    connectDB()
    console.log('server up and running on port', port)
})