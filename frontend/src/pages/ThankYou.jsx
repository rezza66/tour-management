import React from 'react';
import { CheckCircle } from 'lucide-react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Terima Kasih!</h1>
          <p className="text-lg text-gray-600 mb-6">Booking tour Anda telah berhasil dikonfirmasi.</p>
        </div>  
      </div>
    </div>
  );
};

export default ThankYouPage;