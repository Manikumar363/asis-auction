import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/HeaderCustom.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/authSlice";

const Header = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [isBuyDropdownOpen, setBuyDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Profile dropdown state
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check login status and get user info from localStorage
    const checkAuth = () => {
      const token = localStorage.getItem("userToken");
      const userJson = localStorage.getItem("user");
      let loggedIn = false;
      let userObj = null;
      if (token) {
        loggedIn = true;
      } else if (userJson) {
        try {
          userObj = JSON.parse(userJson);
          if (userObj && userObj.token) {
            loggedIn = true;
          }
        } catch (e) {
          userObj = null;
        }
      }
      setIsLoggedIn(loggedIn);
      setUser(userObj);
    };
    checkAuth();
    // Listen for storage changes (e.g., login/logout in other tabs)
    const handleStorage = (event) => {
      if (event.key === "userToken" || event.key === "user") {
        checkAuth();
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const handleSearch = () => {
    if (search) {
      navigate(`/search/${search}`);
    }
  };

  const handleVehicle = (selectedVehicleType) => {
    localStorage.setItem("vehicle_type", selectedVehicleType);
    navigate("/SeeAll", { state: { vehicle_type: selectedVehicleType } });
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    dispatch(logOut()); // Clear Redux state
    setIsLoggedIn(false);
    setUser(null);
    setProfileDropdownOpen(false);
    navigate("/");
  };

  const handleProfileClick = () => {
    setProfileDropdownOpen((open) => !open);
  };

  console.log('Header render: isLoggedIn =', isLoggedIn, 'user =', user);

  return (
    <header className="header-custom-wrapper">
      <div className="header-custom-logo">
        <NavLink to="/">
          <img src="/assets/images/logo2.png" alt="Logo" className="header-custom-logo-img" />
        </NavLink>
      </div>
      <div className="header-custom-right-group">
        <nav className="header-custom-nav">
          <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <div
            className="header-custom-dropdown"
            onMouseEnter={() => setBuyDropdownOpen(true)}
            onMouseLeave={() => setBuyDropdownOpen(false)}
          >
            <span className="header-custom-dropdown-label">
              Buy
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 6, verticalAlign: 'middle' }}>
                <path d="M6.33317 8.33333L10.4998 12.5L14.6665 8.33333" stroke="#363636" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {isBuyDropdownOpen && (
              <div className="header-custom-dropdown-menu">
                <div
                  className="header-custom-dropdown-item"
                  onClick={() => handleVehicle("Truck")}
                >
                  <img src="/assets/icons/truck.svg" alt="Truck" style={{ width: 32, marginRight: 12 }} />
                  <span className="dropdown-bold">HEAVY WEIGHT VEHICLES</span>
                </div>
                <div
                  className="header-custom-dropdown-item"
                  onClick={() => handleVehicle("Car")}
                >
                  <img src="/assets/icons/acr.svg" alt="Car" style={{ width: 32, marginRight: 12 }} />
                  <span className="dropdown-bold">LIGHT WEIGHT VEHICLES</span>
                </div>
              </div>
            )}
          </div>
          <NavLink to="/dashboard/user/upload-product">Sell</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <div className="header-custom-search">
          <input
            type="text"
            placeholder="Search any model"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSearch(); }}
          />
          <button className="header-custom-search-btn" onClick={handleSearch}>
            <i className="fa fa-search" />
          </button>
        </div>
        {isLoggedIn ? (
          <div className="header-custom-profile-dropdown-wrapper" ref={dropdownRef}>
            <button
              className="header-custom-profile-btn"
              onClick={handleProfileClick}
              aria-label="Profile"
            >
              <i className="fa fa-user-circle" style={{ fontSize: 28, color: "#4747e6" }} />
            </button>
            {profileDropdownOpen && (
              <div className="header-custom-profile-dropdown-menu">
                <div className="profile-dropdown-header">
                  Hi! {user ? user.name : "User"}
                  {user && user.avatar && (
                    <img src={user.avatar} alt="Avatar" className="profile-avatar" />
                  )}
                </div>
                <div
                  className="profile-dropdown-item"
                  onClick={() => { navigate("/profile"); setProfileDropdownOpen(false); }}
                >
                  Profile
                </div>
                <div
                  className="profile-dropdown-item"
                  onClick={() => { navigate("/purchases-bids-history"); setProfileDropdownOpen(false); }}
                >
                  Purchases and Bids History
                </div>
                <div
                  className="profile-dropdown-item"
                  onClick={() => { navigate("/auctions-sold-history"); setProfileDropdownOpen(false); }}
                >
                  Auctions and Sold History
                </div>
                <div className="profile-dropdown-divider" />
                <button
                  className="profile-dropdown-logout-btn"
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="header-custom-login-btn">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;