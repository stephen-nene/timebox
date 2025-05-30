import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { 
  FaBars, 
  FaMoon, 
  FaSun, 
  FaUser, 
  FaBell,
  FaChevronDown,
  FaClock,
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaTags,
  FaPhone,
  FaSignInAlt,
  FaTachometerAlt,
  FaGlobe
} from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { 
  MdDashboard,
  MdTimer,
  MdNotifications 
} from "react-icons/md";
import { setDarkMode } from "../store/actions/appAction";

// Extract menu items to separate component
const MenuItems = ({ onClick, userData, isDashRoute, isMobile = false }) => {
  const dashboardLinks = [
    { to: "/dash", label: "Dashboard", icon: <MdDashboard className="w-4 h-4" /> },
    { to: "/dash/timebox", label: "TimeBox", icon: <FaCalendarAlt className="w-4 h-4" /> },
    { to: "/dash/users", label: "Users", icon: <FaUsers className="w-4 h-4" /> },
    { to: "/dash/categories", label: "Categories", icon: <FaTags className="w-4 h-4" /> }
  ];

  const publicLinks = [
    { to: "/", label: "Home", icon: <FaHome className="w-4 h-4" /> },
    { to: "/timebox", label: "Timebox", icon: <FaClock className="w-4 h-4" /> },
    { to: "/pomodoro", label: "Pomodoro", icon: <MdTimer className="w-4 h-4" /> },
    { to: "/contact", label: "Contact", icon: <FaPhone className="w-4 h-4" /> },
  ];

  const links = isDashRoute ? dashboardLinks : publicLinks;

  return (
    <div className={`${isMobile ? 'flex flex-col space-y-2' : 'flex items-center space-x-1'}`}>
      {links.map(({ to, label, icon }) => (
        <NavLink 
          key={to} 
          onClick={onClick} 
          to={to} 
          className={({ isActive }) => `
            ${isMobile 
              ? 'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-700' 
              : 'flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-700'
            }
            ${isActive 
              ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' 
              : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }
          `}
        >
          {icon}
          <span className={isMobile ? 'text-base' : 'text-sm font-medium'}>{label}</span>
        </NavLink>
      ))}

      {!userData && !isDashRoute && (
        <Link
          onClick={onClick}
          to="/login"
          className={`
            ${isMobile 
              ? 'flex items-center justify-center space-x-2 mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl' 
              : 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg'
            }
          `}
        >
          <FaSignInAlt className="w-4 h-4" />
          <span>Login</span>
        </Link>
      )}

      {userData?.role === "admin" && (
        <Link
          onClick={onClick}
          to={isDashRoute ? "/" : "/dash"}
          className={`
            ${isMobile 
              ? 'flex items-center justify-center space-x-2 mt-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl' 
              : 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg'
            }
          `}
        >
          {isDashRoute ? <FaGlobe className="w-4 h-4" /> : <FaTachometerAlt className="w-4 h-4" />}
          <span>{isDashRoute ? "Public" : "Dashboard"}</span>
        </Link>
      )}
    </div>
  );
};

// User Profile Dropdown Component
const UserProfileDropdown = ({ userData, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-dropdown')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!userData) return null;

  return (
    <div className="relative user-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
          {userData.name?.charAt(0).toUpperCase() || userData.email?.charAt(0).toUpperCase() || 'U'}
        </div>
        <FaChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {userData.name || 'User'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {userData.email}
            </p>
          </div>
          
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <FaUser className="w-4 h-4" />
            <span>Profile Settings</span>
          </Link>
          
          <Link
            to="/notifications"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <FaBell className="w-4 h-4" />
            <span>Notifications</span>
          </Link>
          
          <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
          
          <button
            onClick={() => {
              setIsOpen(false);
              // Add logout logic here
            }}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            <FaSignInAlt className="w-4 h-4 rotate-180" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  // Memoized selectors
  const darkMode = useSelector((state) => state.app.darkMode);
  const userData = useSelector((state) => state.user.userData);

  // Compute route type once
  const isDashRoute = location.pathname.startsWith("/dash");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized toggle functions to prevent unnecessary re-renders
  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const toggleDarkMode = React.useCallback(() => {
    dispatch(setDarkMode(!darkMode));
  }, [dispatch, darkMode]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`
      sticky top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
        : 'bg-white dark:bg-gray-900'
      }
    `}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink 
            className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200" 
            to="/"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <FaClock className="w-4 h-4 text-white" />
            </div>
            <span>TimeBox</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center">
            <MenuItems userData={userData} isDashRoute={isDashRoute} />
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            {/* Notifications for logged in users */}
            {userData && (
              <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
                <FaBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {/* User Profile Dropdown */}
            <UserProfileDropdown userData={userData} darkMode={darkMode} />

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <VscChromeClose className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <MenuItems
              onClick={toggleMenu}
              userData={userData}
              isDashRoute={isDashRoute}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </header>
  );
};