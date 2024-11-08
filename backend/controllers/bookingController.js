import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';

export const createBooking = async (req, res) => {
  try {
    const { userId, userEmail, tourName, fullName, guestSize, phone } = req.body;

    // Ambil harga dari tour yang di-booking
    const tour = await Tour.findOne({ title: tourName });
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const newBooking = new Booking({
      userId,
      userEmail,
      tourName,
      fullName,
      guestSize,
      phone,
      bookAt: new Date(),
      price: tour.price, // Menyimpan harga tour
      paymentStatus: 'Paid', // Atur status pembayaran
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', data: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getBookingsByUser = async (req, res) => {
  const { id } = req.params;

  // Validasi id
  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const bookings = await Booking.find({ id }).populate('userId');

    // Jika tidak ada bookings ditemukan
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error); // Mencetak error ke konsol untuk debugging
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