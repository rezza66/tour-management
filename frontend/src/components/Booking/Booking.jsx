import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title, _id } = tour;
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [booking, setBooking] = useState({
    tourId: _id,
    tourName: title,
    fullName: user?.username || "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setBooking((prev) => ({
        ...prev,
        fullName: user.username || prev.fullName,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const serviceFee = 10;
  const totalAmount = price * booking.guestSize + serviceFee;

  const handleClick = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please sign in");

    const selectedDate = new Date(booking.bookAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return alert("Tanggal booking tidak boleh lebih awal dari hari ini");
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        `${BASE_URL}/booking`,
        {
          ...booking,
          userEmail: user.email, // hanya dikirim ke server, tidak ditampilkan
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        navigate("/thank-you");
      } else {
        alert(res.data.message || "Terjadi kesalahan saat booking");
      }
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-lg border border-gray-300 sticky top-20">
      {/* Booking Top */}
      <div className="flex items-center justify-between pb-8 border-b border-gray-300">
        <h3 className="text-2xl font-bold">
          ${price} <span className="text-base font-normal">/per person</span>
        </h3>
        <span className="flex items-center text-xl font-semibold">
          <i className="ri-star-fill text-yellow-400"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking Form */}
      <div className="pt-8">
        <h5 className="mb-4 text-lg font-semibold">Information</h5>
        <form className="space-y-4" onSubmit={handleClick}>
          <input
            type="text"
            id="fullName"
            required
            value={booking.fullName}
            onChange={handleChange}
            placeholder="Nama Lengkap"
            className="input input-bordered w-full"
          />
          <input
            type="number"
            id="phone"
            required
            value={booking.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="input input-bordered w-full"
          />
          <div className="flex gap-4">
            <input
              type="date"
              id="bookAt"
              required
              value={booking.bookAt}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="number"
              id="guestSize"
              min="1"
              required
              value={booking.guestSize}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Book Now"}
          </button>
        </form>
      </div>

      {/* Booking Summary */}
      <div className="mt-8">
        <ul className="list-none space-y-3">
          <li className="flex justify-between">
            <h5 className="text-base font-medium">
              ${price} <i className="ri-close-line"></i> {booking.guestSize}{" "}
              {booking.guestSize > 1 ? "people" : "person"}
            </h5>
            <span>${price * booking.guestSize}</span>
          </li>
          <li className="flex justify-between">
            <h5 className="text-base font-medium">Service charge</h5>
            <span>${serviceFee}</span>
          </li>
          <li className="flex justify-between font-bold text-lg">
            <h5>Total</h5>
            <span>${totalAmount}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Booking;
