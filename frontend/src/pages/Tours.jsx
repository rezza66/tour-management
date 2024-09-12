import React, { useState, useEffect } from "react";
// import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
// import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: tours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

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
                <div className="col-span-1" key={tour._id}>
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
