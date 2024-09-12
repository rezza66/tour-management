import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
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

const corsOptions = {
    origin: true,
    credentials: true
}

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(authRouter)
app.use(tourRoute)
app.use(userRoute)
app.use(reviewRoute)
app.use(bookingRoute)



app.listen(port, ()=> {
    connectDB()
    console.log('server up and running on port', port)
})