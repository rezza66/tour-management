import React from 'react';
import { Link } from 'react-router-dom';
import calculateAvgRating from '../utils/avgRating';
import { BASE_URL } from '../utils/config';

const TourCard = ({ tour }) => {
    const { _id, title, city, photo, price, featured, reviews } = tour;

    const { totalRating, avgRating } = calculateAvgRating(reviews);

    return (
        <div className="card w-full bg-white shadow-lg rounded-lg overflow-hidden">
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
                    <span className="flex items-center text-gray-700 gap-2">
                        <i className="fa-solid fa-location-dot"></i> {city}
                    </span>
                    <span className="flex items-center text-gray-500">
                        <i className="ri-star-fill text-yellow-500 text-xl"></i> {avgRating === 0 ? "Not rated" : avgRating}
                        {totalRating > 0 && <span className="ml-1">({reviews.length})</span>}
                    </span>
                </div>
                <h5 className="text-lg font-semibold mb-3">
                    <Link to={`/tour/${_id}`} className="text-gray-800 hover:text-blue-500">
                        {title}
                    </Link>
                </h5>
                <div className="flex justify-between items-center mt-3">
                    <h5 className="text-gray-800 text-lg font-bold">
                        ${price} <span className="text-sm font-medium text-gray-600">/per person</span>
                    </h5>
                    <button className="btn btn-primary">
                        <Link to={`/tour/${_id}`} className="text-white">
                            Book Now
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TourCard;
