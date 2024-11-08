import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useSelector } from 'react-redux'; 
import calculateAvgRating from '../utils/avgRating';
import { BASE_URL } from '../utils/config';
import Swal from 'sweetalert2'; 

const TourCard = ({ tour }) => {
    const { _id, title, city, photo, price, featured, reviews } = tour;
    const navigate = useNavigate(); 
    const { user } = useSelector((state) => state.auth); 

    const { totalRating, avgRating } = calculateAvgRating(reviews);

    const handleBookNowClick = (e) => {
        e.preventDefault();
        if (user) {
            navigate(`/tour/${_id}`); 
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Please Login',
                text: 'You need to login to book a tour. Redirecting to login page...',
            }).then(() => {
                navigate('/login'); 
            });
        }
    };

    return (
        <div className="card w-full bg-base-100 shadow-lg rounded-lg border border-gray-500 overflow-hidden">
            <div className="relative">
                <img src={`${BASE_URL}/${photo}`} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
                {featured && (
                    <span className="absolute bottom-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-t-lg">
                        Featured
                    </span>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                    <span className="flex items-center text-gray-200 gap-2">
                        <i className="fa-solid fa-location-dot"></i> {city}
                    </span>
                    <span className="flex items-center text-gray-100">
                        <i className="ri-star-fill text-yellow-500 text-xl"></i> {avgRating === 0 ? "Not rated" : avgRating}
                        {totalRating > 0 && <span className="ml-1">({reviews.length})</span>}
                    </span>
                </div>
                <h5 className="text-lg font-semibold mb-3">
                    <Link to={`/tour/${_id}`} className="text-gray-200 hover:text-blue-500">
                        {title}
                    </Link>
                </h5>
                <div className="flex justify-between items-center mt-3">
                    <h5 className="text-gray-100 text-lg font-bold">
                        ${price} <span className="text-sm font-medium text-gray-600">/per person</span>
                    </h5>
                    <button onClick={handleBookNowClick} className="btn btn-primary">
                        <span className="text-white">
                            Book Now
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TourCard;
