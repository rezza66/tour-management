import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/database.js';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRouter from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/booking.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// CORS
app.use(cors({
  origin: process.env.PORT_FE,
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint test
app.get("/app2/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

const app2Router = express.Router();

app2Router.use("/api", authRouter);
app2Router.use("/api", tourRoute);
app2Router.use("/api", userRoute);
app2Router.use("/api", reviewRoute);
app2Router.use("/api", bookingRoute);

app.use("/app2", app2Router);

// Start server
app.listen(port, () => {
  connectDB();
  console.log('Server up and running on port', port);
});
