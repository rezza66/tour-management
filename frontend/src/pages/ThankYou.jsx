import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleGoToMyBookings = () => {
    navigate('/my-book');
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your tour booking has been successfully confirmed.
          </p>
          <button
            onClick={handleGoToMyBookings}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
