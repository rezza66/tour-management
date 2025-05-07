import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsByUser } from "../redux/bookingSlice";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { userBookings, loading, error } = useSelector(
    (state) => state.bookings
  );

  useEffect(() => {
    dispatch(fetchBookingsByUser());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {userBookings.length === 0 && !loading && (
        <p className="text-gray-600">You have no bookings yet.</p>
      )}

      <div className="grid gap-4">
        {[...userBookings]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow rounded-xl p-5 border border-gray-100"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {booking.tourName}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Booking Date:{" "}
                    {new Date(booking.bookAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Guests: {booking.guestSize}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 text-right">
                  <p className="text-sm text-gray-700 font-medium">
                    Price: ${booking.price}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${
                      booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyBookings;
