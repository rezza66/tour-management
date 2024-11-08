import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";

// create new tour
export const createTour = async (req, res) => {
    try {
        // Log data yang diterima
        console.log(req.body);

        const newTour = new Tour({
            ...req.body,
            photo: req.file.path
        });

        const savedTour = await newTour.save();
        res.status(201).json({ success: true, message: "Successfully created", data: savedTour });
    } catch (err) {
        console.error("Error creating tour:", err);

        if (err.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: err.message });
        }

        res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
            error: err.message
        });
    }
};


// update tour
export const updateTour = async(req, res) => {
    const id = req.params.id
    try {
        const updateTour = await Tour.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})       
        res.status(200).json({success: true, message: "Successfully updated", data: updateTour});
    } catch (err) {
        res.status(500).json({success: false, message: "failed to update. Try again"});
    }
}

// getAll tour
export const getAllTour = async (req, res) => {
    // for pagination
    const page = parseInt(req.query.page) || 0;  // Default page to 0 if not provided
    const limit = 8;  // Limit the number of results per page
    const skip = page * limit;
  
    try {
      // Fetch tours with pagination
      const tours = await Tour.find({})
        .populate('reviews')
        .skip(skip)
        .limit(limit);
  
      // Get total number of tours
      const totalTours = await Tour.estimatedDocumentCount();
  
      res.status(200).json({
        success: true,
        count: tours.length,   // Number of tours in the current page
        totalTours,            // Total number of tours in the database
        message: "Successful",
        data: tours
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Not found" });
    }
  };
  
  export const getAllToursWithoutPagination = async (req, res) => {
    try {
      // Mengambil semua tours tanpa pagination
      const tours = await Tour.find({}).populate('reviews');
      
      res.status(200).json({
        success: true,
        count: tours.length,
        message: "Successful",
        data: tours
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Not found" });
    }
  };
  

// get single tour
export const getSingleTour = async(req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id).populate('reviews');
        res.status(200).json({success: true, message: "Successful", data: tour});
    } catch (err) {
        res.status(500).json({success: false, message: "not found"});
    }
}

// delete tour
export const deleteTour = async(req, res) => {
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);   
        res.status(200).json({success: true, message: "Successfully deleted"});
    } catch (err) {
        res.status(500).json({success: false, message: "failed to delete. Try again"});
    }
}

// get tour by search
export const getTourBySearch = async(req, res) => {

    // here 'i' means case sensitive
    const city = new RegExp(req.query.city, 'i')
    const distance = parseInt(req.query.distance)
    const maxGroupSize = parseInt(req.query.maxGroupSize)

    try {
        const tours = await Tour.find({city, distance:{$gte:distance},
        maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')

        res.status(200).json({success: true, message: "Successful", data: tours});
    } catch (err) {
        res.status(404).json({success: false, message: "not found"});
    }
}

// get featured tour
export const getFeaturedTour = async(req, res) => {

    try {
        const tours = await Tour.find({featured:true})
        .limit(8)
        .populate('reviews')
        res.status(200).json({success: true, message: "Successful", data: tours});
    } catch (err) {
        res.status(500).json({success: false, message: "not found"})
    }
}

// get tour counts
export const getTourCount = async(req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount()
        res.status(200).json({success: true, data: tourCount});
    } catch (err) {
        res.status(500).json({success: false, message: "failed to fetch"})
    }
}

// Controller untuk mendapatkan recent tours
export const getRecentTours = async (req, res) => {
  try {
    // Mengambil data tour terbaru, misalnya 5 tour terakhir
    const recentTours = await Tour.find()  // Ambil semua data Tour
      .sort({ createdAt: -1 })            // Sortir berdasarkan tanggal terbaru
      .limit(5);                          // Batasi hanya 5 tour terakhir

    // Loop melalui tour untuk menghitung jumlah customers (misalnya dari model Booking)
    const recentToursWithDetails = await Promise.all(
      recentTours.map(async (tour) => {
        // Hitung jumlah customers yang sudah memesan tour ini
        const customersCount = await Booking.countDocuments({ tourName: tour.title });

        // Tentukan status tour, misalnya "Completed" atau "Ongoing" tergantung dari booking
        const status = new Date(tour.date) < new Date() ? 'Completed' : 'Ongoing';

        return {
          id: tour._id,
          name: tour.title,
          date: tour.date,
          customers: customersCount,
          status: status,
        };
      })
    );

    // Kirimkan data recentTours dengan informasi yang diinginkan
    res.status(200).json({
      success: true,
      data: recentToursWithDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent tours',
      error: error.message,
    });
  }
};
