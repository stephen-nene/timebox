import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaMoon, FaSun, FaUser } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import { setDarkMode } from "../store/actions/appAction";
import "../assets/styles/navbar.css";

// Extract menu items to separate component
const MenuItems = ({ onClick, userData, isDashRoute }) => {
  const dashboardLinks = [
    { to: "/dash", label: "DashHome" },
    { to: "/dash/timebox", label: "TimeBox" },
    { to: "/dash/users", label: "Users" },
    { to: "/dash/categories", label: "Categories" }
  ];

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/timebox", label: "Timebox" },
    { to: "/contact", label: "Contact" }
  ];

  const links = isDashRoute ? dashboardLinks : publicLinks;

  return (
    <>
      {links.map(({ to, label }) => (
        <NavLink key={to} onClick={onClick} to={to} className="nav-link">
          {label}
        </NavLink>
      ))}

      {!userData && !isDashRoute && (
        <Link
          onClick={onClick}
          to="/login"
          className="btn bg-green-500 btn-login"
        >
          Login
        </Link>
      )}

      {userData?.role === "admin" && (
        <Link
          to={isDashRoute ? "/" : "/dash"}
          className="btn bg-green-500  btn-login"
        >
          {isDashRoute ? "Public" : "Dashboard"}
        </Link>
      )}
    </>
  );
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  // Memoized selectors
  const darkMode = useSelector((state) => state.app.darkMode);
  const userData = useSelector((state) => state.user.userData);

  // Compute route type once
  const isDashRoute = location.pathname.startsWith("/dash");

  // Memoized toggle functions to prevent unnecessary re-renders
  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const toggleDarkMode = React.useCallback(() => {
    dispatch(setDarkMode(!darkMode));
  }, [dispatch, darkMode]);

  // Render icons conditionally
  const ThemeToggleIcon = darkMode ? FaSun : FaMoon;
  const themeIconProps = {
    onClick: toggleDarkMode,
    className: `icon dark:text-yellow-400 text-gray-600`,
    size: 24
  };

  return (
    // <div className={``}>
    <header className=" text-xl navbar bg-sky-500 dark:bg-sky-900  dark:text-white bg -[#1f2c31]">
      <nav className="container">
        <div className="navbar-wrapper">
          <NavLink className="text-2xl text-f font-bold" to="/">
            TimeBox
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <MenuItems userData={userData} isDashRoute={isDashRoute} />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {userData && (
              <Link to="/profile">
                <FaUser className="icon " size={24} />
              </Link>
            )}

            <ThemeToggleIcon {...themeIconProps} />

            {/* Mobile Menu Toggle */}
            <div className="md:hidden cursor-pointer">
              {isMenuOpen ? (
                <VscChromeClose onClick={toggleMenu} size={25} />
              ) : (
                <FaBars onClick={toggleMenu} size={25} />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mobile-menu border-black border-t">
          <MenuItems
            onClick={toggleMenu}
            userData={userData}
            isDashRoute={isDashRoute}
          />
        </div>
      )}
    </header>
    // </div>
  );
};