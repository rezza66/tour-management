import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";
import { fetchAllTours } from "../redux/tourSlice";

const Tours = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);

  const { allTours: tours, pageCount, loading, error } = useSelector((state) => state.tours);
  
  useEffect(() => {
    dispatch(fetchAllTours(page)); 
  }, [dispatch, page]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tours]);


  return (
    <>
      <h1 className="text-4xl md:text-5xl pt-6 font-bold text-white text-center">
        All Tours
      </h1>
      <section className="py-12 md:px-20">
        <div className="mx-auto">
          {loading && <h4 className="text-center py-5">Loading...</h4>}
          {error && <h4 className="text-center py-5 text-red-500">{error}</h4>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {tours?.map((tour) => (
                <div className="col-span-1" key={tour._id || tour.id}>
                  <TourCard tour={tour} />
                </div>
              ))}
              <div className="col-span-1 lg:col-span-4 mt-6 flex justify-center gap-3">
                {[...Array(pageCount).keys()].map((number) => (
                  <button
                    key={number}
                    onClick={() => setPage(number)} 
                    className={`px-3 py-1 rounded ${
                      page === number
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } hover:bg-blue-600 hover:text-white`}
                  >
                    {number + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;
