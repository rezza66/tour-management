import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/authSlice";
import logo from "../../assets/logo.jpg";
import avatar from "../../assets/images/avatar.jpg";
import { BASE_URL } from "../../utils/config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDashboardClick = () => {
    setDropdownOpen(false); 
    navigate("/dashboard"); 
  };

  return (
    <div className="sticky top-0 bg-neutral-content shadow-md py-3 md:px-20 z-50">
      <div className="flex items-center justify-between">
        <div className="logo">
          <img src={logo} alt="Logo" className="w-20 md:w-24" />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            About
          </NavLink>
          <NavLink
            to="/tours"
            className="text-gray-700 font-medium hover:text-blue-500"
          >
            Tours
          </NavLink>
        </div>

        <div className="flex items-center space-x-4 relative">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src={user.photo ? `${BASE_URL}/${user.photo}` : avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
                <div className="">
                  <span className="text-gray-800 font-medium">{user.username}</span> {/* Tampilkan username */}
                  {user.role === "admin" && ( // Tampilkan ikon chevron hanya untuk admin
                    <button onClick={toggleDropdown} className="focus:outline-none">
                      <FontAwesomeIcon icon={faChevronDown} className="text-gray-800" />
                    </button>
                  )}
                </div>
              </div>

              {/* Dropdown hanya ditampilkan jika user adalah admin */}
              <div className="pt-3">
              {user.role === "admin" && dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  <button
                    onClick={handleDashboardClick} // Mengarahkan dan menutup dropdown
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                </div>
              )}
              </div>

              <button
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-info">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </>
          )}
        </div>

        <button className="block md:hidden text-gray-700 text-lg">
          <i className="ri-menu-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Header;
