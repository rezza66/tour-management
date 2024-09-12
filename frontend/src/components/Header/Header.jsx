import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import logo from "../../assets/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700 font-medium">{user.username}</span>
              <button className="btn btn-primary" onClick={handleLogout}>
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
