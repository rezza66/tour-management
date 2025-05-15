import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchFeaturedTours } from '../../redux/tourSlice';
import calculateAvgRating from '../../utils/avgRating';
import Swal from 'sweetalert2';

const FeaturedTourList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { featuredTours, loading, error } = useSelector((state) => state.tours);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchFeaturedTours()); // Memuat featured tours dari Redux
  }, [dispatch]);

  const handleBookNowClick = (tourId, e) => {
    e.preventDefault();
    if (user) {
      navigate(`/tour/${tourId}`); 
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
    <>
      {loading && <h4 className="text-center text-lg font-semibold">Loading...</h4>}
      {error && <h4 className="text-center text-lg font-semibold text-red-500">{error}</h4>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {!loading && !error && featuredTours?.map((tour) => {
          const { _id, title, city, photo, price, featured, reviews } = tour;
          const { totalRating, avgRating } = calculateAvgRating(reviews);

          return (
            <div key={_id} className="card w-full bg-base-100 shadow-lg rounded-lg border border-gray-500 overflow-hidden">
              <figure className="relative">
                <img src={photo} alt={title} className="rounded-t-lg" />
                {featured && (
                  <span className="absolute bottom-0 right-0 bg-primary text-white px-2 py-1 rounded-tl-lg">
                    Featured
                  </span>
                )}
              </figure>
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot" style={{color: "#74c0fc"}}></i> {city}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <i className="ri-star-fill"></i> {avgRating === 0 ? 'Not rated' : avgRating}
                    {totalRating > 0 && <span>({reviews.length})</span>}
                  </span>
                </div>
                <h5 className="text-xl font-semibold mt-2">
                  <Link to={`/tour/${_id}`} className="hover:text-primary transition duration-300">
                    {title}
                  </Link>
                </h5>
                <div className="flex justify-between items-center mt-3">
                  <h5 className="text-secondary font-bold text-lg">${price} <span className="text-sm font-normal">/ person</span></h5>
                  <button onClick={(e) => handleBookNowClick(_id, e)} className="btn btn-primary">
                    <span className="text-white">Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FeaturedTourList;
