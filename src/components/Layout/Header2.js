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

const Header2 = () => {
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
    if (e.key === "Enter") {
      navigate(`/search/${search}`);
    }
  };
  const handlePressSearch=async()=>{ 
    if(search.length>0){
        navigate(`/search/${search}`);
    }
  }
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
    <>
      <nav class="navbar navbar-expand-md bg-body-tertiary">
        <div class="container-xl">
          <a class="navbar-brand" href="#">
            <p>Car Auction</p>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <NavLink to={`/`} class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </NavLink>

              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Buy
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <i class="fa-solid fa-car"></i>
                    <a class="dropdown-item" href="#">
                      Light Vehicle
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <i class="fa-solid fa-truck"></i>
                    <a class="dropdown-item" href="#">
                      Heavy Vehicle
                    </a>
                  </li>
                </ul>
              </li>
              <li class="nav-item ">
                <a
                  class="nav-link "
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Sell
                </a>
              </li>
              <NavLink to="/services" class="nav-item">
                <a class="nav-link">Service</a>
              </NavLink>
              <li class="nav-item">
                <a class="nav-link">Contact</a>
              </li>
            </ul>
            <div class="search-and-icons">
              <div
                class="p-1 bg-light rounded rounded-pill shadow-sm mb-4"
                style={{ width: "100%" }}
              >
                <div class="input-group">
                  <input
                    type="search"
                    placeholder="What're you searching for?"
                    aria-describedby="button-addon1"
                    class="form-control border-0 bg-light"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleSearch}
                  />
                  <div class="input-group-append">
                    <button
                      id="button-addon1"
                      type="submit"
                      class="btn btn-link text-primary"
                      onClick={handlePressSearch}
                    >
                      <i class="fa fa-search" style={{ color: "#336598" }} ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header2;
