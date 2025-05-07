import User from "../models/User.js";
import Booking from '../models/Booking.js';

// create new User
export const createUser = async(req, res) => {
    const newUser = new User(req.body);

    try {
        const savedUser = await newUser.save();
        res.status(200).json({success: true, message: "Successfully created", data: savedUser});
    } catch (err) {
        res.status(500).json({success: false, message: "failed to create. Try again"});
    }
}

// update User
export const updateUser = async(req, res) => {
    const id = req.params.id
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})       
        res.status(200).json({success: true, message: "Successfully updated", data: updateUser});
    } catch (err) {
        res.status(500).json({success: false, message: "failed to update. Try again"});
    }
}

// getAll User
export const getAllUser = async(req, res) => {
   
    try {
        const users = await User.find({})

        res.status(200).json({success: true, message: "Successful", data: users});
    } catch (err) {
        res.status(500).json({success: false, message: "not found"})
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const id = req.user.id; 
        const user = await User.findById(id).select("-password"); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getUsersWithBookings = async (req, res) => {
  try {
    // Mengambil semua userId unik dari booking
    const bookings = await Booking.find().distinct('userId');
    
    // Mendapatkan informasi user berdasarkan userId yang unik
    const users = await User.find({ _id: { $in: bookings } });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// delete User
export const deleteUser = async(req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);   
        res.status(200).json({success: true, message: "Successfully deleted"});
    } catch (err) {
        res.status(500).json({success: false, message: "failed to delete. Try again"});
    }
}