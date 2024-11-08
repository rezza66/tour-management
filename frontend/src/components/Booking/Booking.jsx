import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import axios from "axios";  
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();

  // Mengambil user dari state Redux
  const { user } = useSelector((state) => state.auth);

  const [booking, setBooking] = useState({
    userId: user ? user._id : "", 
    userEmail: user ? user.email : "", 
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(booking);

    try {
      if (!user) {
        return alert("Please sign in");
      }
      const token = localStorage.getItem("accessToken");

      const res = await axios.post(
        `${BASE_URL}/booking`,
        booking,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      const result = res.data;

      if (res.status !== 200) {
        return alert(result.message);
      }
      navigate("/thank-you");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
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
            placeholder="Full Name"
            id="fullName"
            required
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Phone"
            id="phone"
            required
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <div className="flex gap-4">
            <input
              type="date"
              id="bookAt"
              required
              onChange={handleChange}
              className="input input-bordered w-full"
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              min='1'
              required
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">
            Book Now
          </button>
        </form>
      </div>

      {/* Booking Bottom */}
      <div className="mt-8">
        <ul className="list-none space-y-3">
          <li className="flex justify-between">
            <h5 className="text-base font-medium">
              ${price} <i className="ri-close-line"></i> 1 person
            </h5>
            <span>${price}</span>
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
