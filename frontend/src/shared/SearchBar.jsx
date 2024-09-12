import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "") {
      return alert("All fields are required!");
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
    );

    if (!res.ok) alert("Something went wrong");

    const result = await res.json();

    navigate(
      `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
      { state: result.data }
    );
  };

  return (
    <div className="lg:col-span-12 mt-12">
      <div className="search-bar bg-neutral-content p-4 rounded-full shadow-lg w-max mx-auto">
        <form className="flex items-center gap-6">
          <div className="flex items-center gap-3 border-r pr-4">
            <span className="text-2xl text-error">
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6 className="mb-0 text-sm text-base-200 font-semibold">Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
                className="border-none text-sm bg-white input-bordered input-error font-medium focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 border-r pr-4">
            <span className="text-2xl text-error">
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6 className="mb-0 text-sm text-base-200 font-semibold">Distance</h6>
              <input
                type="number"
                placeholder="Distance k/m"
                ref={distanceRef}
                className="border-none text-sm text-base-content font-medium focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl text-error">
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6 className="mb-0 text-sm text-base-200 font-semibold">Max People</h6>
              <input
                type="number"
                placeholder="0"
                ref={maxGroupSizeRef}
                className="border-none text-sm text-base-content font-medium focus:outline-none"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={searchHandler}
            className="search-icon text-xl p-2 bg-primary text-white rounded-lg cursor-pointer"
          >
            <i className="ri-search-line"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
