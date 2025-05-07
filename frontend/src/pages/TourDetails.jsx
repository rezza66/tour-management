import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/Booking/Booking";
import { BASE_URL } from "../utils/config";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef(null);
  const [tour, setTour] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tourRating, setTourRating] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Ambil user dari authSlice
  const user = useSelector((state) => state.auth.user);
  const token = user?.token || localStorage.getItem("accessToken"); 

  // Fetch data tour dengan axios
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/tours/${id}`);
        setTour(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  // Destructure properties dari tour object
  const {
    photo,
    title,
    desc,
    price,
    reviews,
    address,
    city,
    distance,
    maxGroupSize,
  } = tour || {};

  const { totalRating, avgRating } = calculateAvgRating(reviews || []);

  // Format tanggal
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Submit review
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    // Validasi input
    if (!tourRating) {
      alert("Please select a rating.");
      return;
    }

    if (!reviewText) {
      alert("Please provide your review.");
      return;
    }

    try {
      if (!token) {
        alert("Please sign in");
        return;
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await axios.post(`${BASE_URL}/review/${id}`, reviewObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      alert(res.data.message);
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Please try again later.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  return (
    <div className="py-8">
      {loading && <h4 className="text-center text-2xl">Loading...</h4>}
      {error && <h4 className="text-center text-2xl">{error}</h4>}
      {!loading && !error && tour && (
        <div className="grid md:px-20 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img className="w-full" src={`${BASE_URL}/${photo}`} alt={title} />
              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1 text-yellow-500">
                    <i className="ri-star-fill"></i>{" "}
                    {avgRating !== 0 && avgRating}
                    {totalRating === 0 ? (
                      <span className="text-gray-400">Not rated</span>
                    ) : (
                      <span className="ml-1">({reviews?.length})</span>
                    )}
                  </span>
                  <span className="text-gray-500">
                    <i className="ri-map-pin-user-fill"></i> {address}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <span className="text-gray-500">
                    <i className="ri-map-pin-2-line"></i> {city}
                  </span>
                  <span className="text-gray-500">
                    <i className="ri-money-dollar-circle-line"></i> ${price} / per person
                  </span>
                  <span className="text-gray-500">
                    <i className="ri-map-pin-time-line"></i> {distance} km
                  </span>
                  <span className="text-gray-500">
                    <i className="ri-group-line"></i> {maxGroupSize} people
                  </span>
                </div>
                <h5 className="text-xl font-semibold mb-4">Description</h5>
                <p className="text-gray-700">{desc}</p>
              </div>
            </div>

            {/* --- Tour reviews section start --- */}
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">
                Reviews ({reviews?.length} reviews)
              </h4>
              <form onSubmit={submitHandler} className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <span
                      key={rating}
                      onClick={() => setTourRating(rating)}
                      className={`cursor-pointer text-yellow-500 ${
                        tourRating === rating ? "font-bold" : ""
                      }`}
                    >
                      {rating} <i class="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <input
                    type="text"
                    ref={reviewMsgRef}
                    placeholder="Share your thoughts"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    required
                  />
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              <div>
                {reviews?.map((review) => (
                  
                  <div key={review._id} className="flex gap-4 mb-4">
                    <img
                      src={avatar}
                      alt={review.image}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h5 className="font-bold">{review.username}</h5>
                          <p className="text-gray-500 text-sm">
                            {new Date(review.createdAt).toLocaleDateString(
                              "en-US",
                              options
                            )}
                          </p>
                        </div>
                        <span className="flex items-center text-yellow-500">
                          {review.rating} <i class="fa-solid fa-star" style={{color: "#FFD43B"}}></i>
                        </span>
                      </div>
                      <p>{review.reviewText}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* --- Tour reviews section end --- */}
          </div>
          <div>
            <Booking tour={tour} avgRating={avgRating} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TourDetails;
