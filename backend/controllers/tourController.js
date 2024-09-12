import Tour from "../models/Tour.js";

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
export const getAllTour = async(req, res) => {
    // for pagination
    const page = parseInt(req.query.page);
    try {
        const tours = await Tour.find({})
        .populate('reviews')
        .skip(page * 8)
        .limit(8)
        res.status(200).json({success: true, count: tours.length, message: "Successful", data: tours});
    } catch (err) {
        res.status(500).json({success: false, message: "not found"})
    }
}

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