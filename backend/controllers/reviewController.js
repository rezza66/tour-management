import Tour from '../models/Tour.js';
import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  const tourId = req.params.id;

  // Validasi jika tourId ada
  if (!tourId) {
    return res.status(400).json({
      success: false,
      message: "Tour ID is required",
    });
  }

  const newReview = new Review({ ...req.body });

  try {
    // Simpan review baru ke database
    const savedReview = await newReview.save();

    // Update array reviews di model Tour
    const updatedTour = await Tour.findByIdAndUpdate(
      tourId,
      { $push: { reviews: savedReview._id } },
      { new: true } // Mengembalikan tour yang sudah diperbarui
    );

    // Jika tour tidak ditemukan
    if (!updatedTour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // Respons sukses
    res.status(200).json({
      success: true,
      message: "Review submitted",
      data: savedReview,
    });
  } catch (err) {
    console.error("Error creating review:", err.message); // Log error untuk debugging
    res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: err.message, // Kirimkan pesan error untuk debugging
    });
  }
};
