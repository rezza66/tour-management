import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../../redux/authSlice";
import logo from "../../assets/logo.jpg";
import avatar from "../../assets/images/avatar.jpg";
import { BASE_URL } from "../../utils/config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDashboardClick = () => {
    setDropdownOpen(false); 
    navigate("/dashboard"); 
    setMobileMenuOpen(false);
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    navigate("/user-profile");
    setMobileMenuOpen(false);
  };

  const closeAllMenus = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 bg-neutral-content shadow-md py-3 px-4 md:px-20 z-50">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Logo" className="w-20 md:w-24" />
        </div>
  
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className="text-gray-700 font-medium hover:text-blue-500" onClick={closeAllMenus}>
            Home
          </NavLink>
          <NavLink to="/about" className="text-gray-700 font-medium hover:text-blue-500" onClick={closeAllMenus}>
            About
          </NavLink>
          <NavLink to="/tours" className="text-gray-700 font-medium hover:text-blue-500" onClick={closeAllMenus}>
            Tours
          </NavLink>
        </div>
  
        {/* User Actions - Desktop */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                <img
                  src={user.photo || avatar}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
                <div>
                  <span className="text-gray-800 font-medium">{user.username}</span>
                  {(user.role === "admin" || user.role === "user") && (
                    <button onClick={toggleDropdown} className="focus:outline-none">
                      <FontAwesomeIcon icon={faChevronDown} className="text-gray-800" />
                    </button>
                  )}
                </div>
              </div>
  
              {/* Dropdown untuk admin dan user */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                  {user.role === "admin" ? (
                    <button
                      onClick={handleDashboardClick}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Dashboard
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={handleProfileClick}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Profile
                      </button>
                      <Link
                        to="/my-book"
                        onClick={closeAllMenus}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        My Bookings
                      </Link>
                    </>
                  )}
                </div>
              )}
  
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
  
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-lg focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} size="lg" />
        </button>
      </div>
  
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-3 py-2 px-4">
          <div className="flex flex-col space-y-3">
            <NavLink to="/" className="text-gray-700 font-medium hover:text-blue-500 py-2" onClick={closeAllMenus}>
              Home
            </NavLink>
            <NavLink to="/about" className="text-gray-700 font-medium hover:text-blue-500 py-2" onClick={closeAllMenus}>
              About
            </NavLink>
            <NavLink to="/tours" className="text-gray-700 font-medium hover:text-blue-500 py-2" onClick={closeAllMenus}>
              Tours
            </NavLink>
  
            {user ? (
              <>
                {user.role === "admin" && (
                  <button
                    onClick={handleDashboardClick}
                    className="text-gray-700 font-medium hover:text-blue-500 py-2 text-left"
                  >
                    Dashboard
                  </button>
                )}
                {user.role === "user" && (
                  <>
                    <button
                      onClick={handleProfileClick}
                      className="text-gray-700 font-medium hover:text-blue-500 py-2 text-left"
                    >
                      Profile
                    </button>
                    <Link
                      to="/my-book"
                      onClick={closeAllMenus}
                      className="text-gray-700 font-medium hover:text-blue-500 py-2 text-left"
                    >
                      My Bookings
                    </Link>
                  </>
                )}
                <button onClick={handleLogout} className="btn btn-primary w-full mt-2">
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 mt-2">
                <Link to="/login" className="btn btn-info w-full" onClick={closeAllMenus}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary w-full" onClick={closeAllMenus}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Header;