import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            family: 4
        });
        console.log('MongoDB is connected');
    } catch (error) {
        console.log(error.message);
    }
};