import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Calendar, Users, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../components/Sidebar/Sidebar";
import { getTourCount } from "../redux/tourSlice"; 
import { fetchUsers } from "../redux/userSlice";
import { fetchBookingsRevenueTrends, fetchAllBookings } from "../redux/bookingSlice";  

const Dashboard = () => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const { tourCount } = useSelector((state) => state.tours);
  const { users } = useSelector((state) => state.users);
  const { bookingsRevenueTrends, totalRevenue, allBookings } = useSelector((state) => state.bookings);
  const totalUsers = users.length;

  useEffect(() => {
    dispatch(getTourCount());
    dispatch(fetchUsers());
    dispatch(fetchBookingsRevenueTrends());
    dispatch(fetchAllBookings());  
  }, [dispatch]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Filter bookings berdasarkan status
  const filteredBookings = allBookings.filter((booking) => {
    return filterStatus === "All" || booking.status === filterStatus;
  });

  // Metrik baru
  const totalBookings = filteredBookings.length;
  const averageRevenuePerBooking = totalBookings > 0 ? (totalRevenue / totalBookings).toFixed(2) : 0;

  const formattedData = bookingsRevenueTrends.map((item) => ({
    name: `${item._id.month}/${item._id.year}`, 
    bookings: item.totalBookings,
    revenue: item.totalRevenue,
  }));

  return (
    <div className="bg-gray-200 min-h-screen flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button onClick={toggleSidebar} className="text-gray-500 lg:hidden">
              <Menu size={24} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              {/* Metric cards */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Total Tours Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Tours</dt>
                          <dd className="text-3xl font-semibold text-gray-900">{tourCount || "Loading..."}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Customers Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                          <dd className="text-3xl font-semibold text-gray-900">{totalUsers || "Loading..."}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Revenue Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                          <dd className="text-3xl font-semibold text-gray-900">${totalRevenue.toLocaleString() || "Loading..."}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Bookings Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                          <dd className="text-3xl font-semibold text-gray-900">{totalBookings}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Avg Revenue per Booking Card */}
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                        <DollarSign className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">Avg Revenue per Booking</dt>
                          <dd className="text-3xl font-semibold text-gray-900">${averageRevenuePerBooking}</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Bookings and Revenue Trend</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={formattedData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="bookings" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
              </div>

              {/* Bookings table */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">User Bookings</h2>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="mb-4 border border-gray-300 rounded-md p-2"
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <table className="min-w-full text-gray-900 bg-white border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Tour Name</th>
                      <th className="px-4 py-2 border">Guest Size</th>
                      <th className="px-4 py-2 border">Phone</th>
                      <th className="px-4 py-2 border">Status</th>
                      <th className="px-4 py-2 border">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-4 py-2 border">{booking.fullName}</td>
                        <td className="px-4 py-2 border">{booking.tourName}</td>
                        <td className="px-4 py-2 border">{booking.guestSize}</td>
                        <td className="px-4 py-2 border">{booking.phone}</td>
                        <td className="px-4 py-2 border">{booking.status}</td>
                        <td className="px-4 py-2 border">{new Date(booking.bookAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
