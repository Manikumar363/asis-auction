import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../../features/authSlice";
import { toast } from "react-toastify";

const Headerr = () => {
  const { token } = useSelector((state) => state.auth);
  const { userName } = useSelector((state) => state.auth);
  const [isNavbarToggled, setNavbarToggled] = useState(false);
  const [search, setSearch] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);

  // const firstName = userName.split(" ")[0];


  const navbarRef = useRef(null);
  const dispatch = useDispatch();
  const path = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logOut());
  };
  const toggleInputVisibility = () => {
    setInputVisible(!isInputVisible);
  };
  const handleSearch = async (e) => {
    if (search) {
      navigate(`/search/${search}`);
    }
    else {
      toast.warn('No Model Name Entered', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme: "light",

      });
    }
  };
  useEffect(() => {
    const handleNavbarItemClick = () => {
      setNavbarToggled(false);
    };

    let handleDocumentClick = (event) => {
      if (
        isNavbarToggled &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setNavbarToggled(false);
      }
    };

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("touchend", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("touchend", handleDocumentClick);
    };
  }, [isNavbarToggled]);

  const handleNavbarToggle = () => {
    setNavbarToggled(!isNavbarToggled);
    toggleInputVisibility();
  };
  const handleVehicle = (selectedVehicleType) => {
    // alert(selectedVehicleType);

    localStorage.setItem("vehicle_type", selectedVehicleType);
    navigate("/SeeAll", { state: { vehicle_type: selectedVehicleType } });
    // navigate("/SeeAll");
  };
  return (
    <Navbar expand="lg" className="site-header bg-body-tertiary">
      <div className="inner-header container clearfix">
        <Container className="header-container">
          <div className="logo">
            <NavLink to="/">
              <Navbar.Brand>
                <img src="/assets/images/logo2.png" className="logo" />
              </Navbar.Brand>
            </NavLink>
          </div>
          {!isNavbarToggled ? (
            <Navbar.Toggle
              onClick={handleNavbarToggle}
              aria-controls="basic-navbar-nav"
              id="toggle-bar"
            />
          ) : (
            <Navbar.Toggle
              onClick={handleNavbarToggle}
              aria-controls="basic-navbar-nav"
              id="toggle-bar"
            >
              <CloseButton ref={navbarRef} id="toggle-close" />
            </Navbar.Toggle>
          )}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto main-navigation text-left hidden-xs hidden-sm">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  {/* <NavLink to="/SeeAll">Buy</NavLink> */}
                  <div className="custom-dropdown">
                    <span className="main-item">Buy</span>
                    <ul className="dropdown-list">
                      <li className="dropdown-buy">
                        <Button
                          onClick={() => {
                            handleVehicle("Truck");
                          }}
                          className="no-style"
                        >
                          <img
                            src="/assets/icons/truck.svg"
                            height={40}
                            style={{ marginTop: "10px", marginRight: "20px" }}
                          />
                          Heavy weight Vehicles
                        </Button>
                      </li>
                      <li>
                        <Button
                          onClick={() => {
                            handleVehicle("Car");
                          }}
                          className="no-style"
                        >
                          <img
                            src="/assets/icons/acr.svg"
                            height={40}
                            style={{ marginRight: "20px" }}
                          />
                          Light weight Vehicles
                        </Button>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <NavLink to="/dashboard/user/upload-product">Sell </NavLink>
                </li>
                <li>
                  <NavLink to="/services">Services</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </ul>
            </Nav>

            <div className="search-container">
              <div className="search-icon" onClick={handleSearch}>
                <i className="fa fa-search" />
              </div>
              <input
                autocomplete="false"
                className="form-control form-control-sm ml-3 w-75 nav-link"
                type="text"
                name="search"
                placeholder="Search any Model"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}

                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }} // Call handleSearch on Enter key press
              />
            </div>

            {token ? (
              <div className="dropdown-container">
                <a href="#">
                  <div className="search-container none">
                    <div className="search-icon">
                      <i className="fa fa-user" aria-hidden="true"></i>
                    </div>
                  </div>
                </a>
                <ul
                  className="dropdown-menu"
                  style={{ width: "100%", background: "#336699" }}
                >
                  <li
                    className="text-center  text-warning"
                    style={{ backgroundColor: "#2E5D8E" }}
                  >
                    <h6 className="p-3">
                      Hi!  <span>{userName}</span> <img src="/assets/icons/hi.svg" width={18} style={{ margin: "0px 3px" }} />

                    </h6>
                  </li>

                  <NavLink to={`/dashboard/user`}>
                    <li className="dropdown-menu-item">Profile</li>
                  </NavLink>
                  <NavLink to={`/dashboard/user/Bidding_history`}>
                    <li className="dropdown-menu-item">
                      Purchases and
                      <br /> Bids History
                    </li>
                  </NavLink>
                  <NavLink to={`/dashboard/user/upload-product`}>
                    <li className="dropdown-menu-item">
                      Auctions and
                      <br />
                      Sold History
                    </li>
                  </NavLink>
                  <li className="dropdown-menu-item">
                    <NavLink
                      role="button"
                      tabIndex="0"
                      onClick={handleLogout}
                      to={"/"}
                      className="logout"
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="login-signup">
                <NavLink
                  to="/login"
                  className="btn nav-link advanced-button"
                  style={{ width: "100px" }}
                >
                  LOGIN
                </NavLink>
                <NavLink
                  to="/signup"
                  className="btn nav-link advanced-button"
                  style={{ width: "100px" }}
                >
                  SIGN UP
                </NavLink>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </div>
    </Navbar>
  );
};

export default Headerr;
