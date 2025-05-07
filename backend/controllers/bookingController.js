import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';

export const createBooking = async (req, res) => {
  try {
    const { id: userId, email: userEmail } = req.user;
    const { tourId, fullName, guestSize, phone, bookAt } = req.body;

    // Validasi data yang diperlukan
    if (!tourId || !fullName || !guestSize || !phone || !bookAt) {
      return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    // Validasi jumlah tamu
    if (guestSize < 1) {
      return res.status(400).json({ message: 'Jumlah tamu minimal 1' });
    }

    // Validasi format nomor telepon
    if (!/^\d+$/.test(phone)) {
      return res.status(400).json({ message: 'Nomor telepon harus berupa angka' });
    }

    // Validasi tanggal booking
    const selectedDate = new Date(bookAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return res.status(400).json({ message: 'Tanggal booking tidak valid' });
    }

    // Cari tour berdasarkan ID
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: 'Tour tidak ditemukan' });
    }

    const newBooking = new Booking({
      userId,
      userEmail,
      tourId,
      tourName: tour.title,
      fullName,
      guestSize,
      phone,
      bookAt: selectedDate,
      price: tour.price,
      status: 'Completed'
    });

    await newBooking.save();
    res.status(201).json({ 
      success: true,
      message: 'Booking berhasil dibuat', 
      data: newBooking 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Terjadi kesalahan server', 
      error: error.message 
    });
  }
};

export const getBookingsByUser = async (req, res) => {
  const userId = req.user.id; 

  try {
    const bookings = await Booking.find({ userId }).populate('userId', '-password');

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// get single booking
export const getBooking = async(req, res) => {
    const id = req.params.id

    try {
        const book = await Booking.findById(id)

        res.status(200).json({
            success: true, message: "successful", data: book 
        })
    } catch (err) {
        res.status(404).json({success: true, message: "not found"});
    }
}

// get all booking
export const getAllBooking = async(req, res) => {

    try {
        const books = await Booking.find()

        res.status(200).json({
            success: true, message: "successful", data: books 
        })
    } catch (err) {
        res.status(404).json({success: true, message: "internal server error"});
    }
}

export const getBookingAndRevenueTrends = async (req, res) => {
    try {
      const trends = await Booking.aggregate([
        {
          $lookup: {
            from: "tours",
            localField: "tourName",
            foreignField: "title",
            as: "tourDetails",
          },
        },
        {
          $unwind: "$tourDetails",
        },
        {
          $group: {
            _id: {
              month: { $month: "$bookAt" }, // Mengelompokkan berdasarkan bulan
              year: { $year: "$bookAt" },
            },
            totalBookings: { $sum: 1 },
            totalRevenue: { $sum: { $multiply: ["$tourDetails.price", "$guestSize"] } },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 }, // Mengurutkan berdasarkan bulan dan tahun
        },
      ]);
  
      res.status(200).json(trends);
    } catch (error) {
      res.status(500).json({ message: "Error fetching trends", error });
    }
  };