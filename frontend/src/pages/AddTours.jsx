import React, { useState } from "react";
import { Camera } from "lucide-react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Menu } from "lucide-react";
import { BASE_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";

const AddTour = () => {
  const [tourData, setTourData] = useState({
    title: "",
    city: "",
    address: "",
    photo: "",
    desc: "",
    price: "",
    maxGroupSize: "",
    featured: false,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(null); 
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTourData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
  
    const formData = new FormData();
    formData.append('title', tourData.title);
    formData.append('city', tourData.city);
    formData.append('address', tourData.address);
    formData.append('photo', tourData.photo); // Pastikan ini adalah file, bukan string
    formData.append('desc', tourData.desc);
    formData.append('price', tourData.price);
    formData.append('maxGroupSize', tourData.maxGroupSize);
    formData.append('featured', tourData.featured);
  
    try {
      const response = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create. Try again");
      }
  
      await response.json();
      setSuccessMessage("Tour added successfully!");
      setErrorMessage(null);
      setTourData({
        title: "",
        city: "",
        address: "",
        photo: "",
        desc: "",
        price: "",
        maxGroupSize: "",
        featured: false,
      });
      navigate('/tours')
    } catch (error) {
      console.error("Error adding tour:", error);
      setErrorMessage(error.message);
      setSuccessMessage(null);
    }
  };
  

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Add New Tour</h1>
            <button onClick={toggleSidebar} className="text-gray-500 lg:hidden">
              <Menu size={24} />
            </button>
          </div>
        </header>
        <div className="m-5 sm:mx-auto sm:w-full sm:max-w-md p-6 bg-white rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Tour</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                {successMessage}
              </div>
            )}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={tourData.title}
                onChange={handleChange}
                required
                placeholder="Enter title"
                className="mt-1 focus:ring-gray-500 bg-white focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-1 text-black"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={tourData.city}
                onChange={handleChange}
                required
                placeholder="Enter city"
                className="mt-1 focus:ring-gray-500 bg-white focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-1 text-black"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={tourData.address}
                onChange={handleChange}
                required
                placeholder="Enter address"
                className="mt-1 focus:ring-gray-500 bg-white focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-1 text-black"
              />
            </div>

            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <Camera size={18} />
                </span>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={(e) => handleChange({
                    target: {
                      name: "photo",
                      value: e.target.files[0], // Ambil file yang diupload
                    },
                  })}
                  required
                  className="mt-1 flex-1 block w-full focus:ring-gray-500 bg-white focus:border-gray-500 pl-10 sm:text-sm border-gray-300 rounded-md py-1"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="desc"
                name="desc"
                value={tourData.desc}
                onChange={handleChange}
                required
                placeholder="Enter description"
                rows="3"
                className="mt-1 focus:ring-gray-500 bg-white focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-1 text-black"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  min="1"
                  value={tourData.price}
                  onChange={handleChange}
                  required
                  className="mt-1 focus:ring-gray-500 bg-white focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-1 text-black"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="maxGroupSize"
                className="block text-sm font-medium text-gray-700"
              >
                Max Group Size
              </label>
              <input
                type="number"
                id="maxGroupSize"
                name="maxGroupSize"
                min="1"
                value={tourData.maxGroupSize}
                onChange={handleChange}
                required
                placeholder="Enter max group size"
                className="mt-1 focus:ring-gray-500 bg-white focus:border-gray-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-1 text-black"
              />
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="featured"
                  name="featured"
                  type="checkbox"
                  checked={tourData.featured}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="featured" className="font-medium text-gray-700">
                  Featured
                </label>
                <p className="text-gray-500">
                  Mark this tour as featured
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Tour
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTour;
