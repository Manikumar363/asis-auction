import React from "react";
import { GetAuctions } from "../features/apiCall";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import '../styles/ListingGridCustom.css';
import { DropdownIcon } from "./icons";

const ProductCarousel = () => {
  const [filterdata, setfilterdata] = useState([])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState("Ongoing");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAuctions(dispatch, {
          selectedYear: "",
          selectedModel: "",
          selectedManufacturer: "",
          selectedStatus: "",
          currentPage: "",
          pageSize: "",
          selectedState: "",
          vehicle_type: "",
        });
        setCars(data.auctions);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    handleDatatoShow()
  }, [cars])

  const handleDatatoShow = (val = "Ongoing") => {
    var data = [];
    const isBidExpired = (expiryDate) => new Date(expiryDate) < new Date();
    const isUpcoming = (startDate) => new Date() < new Date(startDate);
    if (val === "Upcoming") {
      data = cars.filter((item, index) => isUpcoming(item.auction_start) && !isBidExpired(item.auction_end) && index <= 12);
    }
    if (val === "Ongoing") {
      data = cars.filter((item, index) => !isUpcoming(item.auction_start) && !isBidExpired(item.auction_end) && index <= 12);
    }
    if (val === "Closed") {
      data = cars.filter((item) => isBidExpired(item.auction_end));
    }
    setfilterdata(data)
  };

  const dateformatter = (date) => {
    const res = new Date(date)
    return `${res.getDate()}-${res.getMonth() + 1}-${res.getFullYear()}`
  }

  return (
    <div className="listing-grid-wrapper">
      {/* Header Section */}
      <div className="listing-grid-header">
        <div>
          <h1 className="listing-grid-title">
            <span className="listing-grid-title-blue">Explore</span> Vehicles
          </h1>
          <div className="listing-grid-subtitle">
            Browse listings and place your winning bid today.
          </div>
        </div>
      </div>
      {/* Filter Row */}
      <div className="listing-grid-filter-row">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="listing-grid-filter-label">Auction Status</div>
          <div className="listing-grid-filter-wrapper">
            <Form.Select
              className="listing-grid-filter-select"
              aria-label="Auction Status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                handleDatatoShow(e.target.value);
              }}
            >
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Closed">Closed</option>
            </Form.Select>
            <span className="custom-dropdown-icon">
              <DropdownIcon />
            </span>
          </div>
        </div>
        <button className="listing-grid-seeall-btn" onClick={() => navigate('/SeeAll')}>See All Vehicles</button>
      </div>
      {/* Grid of Cards */}
      <div className="listing-grid-cards">
        {filterdata.length > 0 ? filterdata.map((item, index) => (
          <Link to={`/auction/${item._id}`} key={item._id} className="listing-grid-card-link">
            <div className="listing-grid-card">
              <div className="listing-grid-card-img-wrap">
                <img src={item.car.images[0]} alt={item.car.model} className="listing-grid-card-img" />
                <span className={`listing-grid-card-badge ${status === 'Closed' ? 'ended' : status === 'Ongoing' ? 'ongoing' : 'upcoming'}`}>
                  {status === 'Closed' ? 'Ended' : status === 'Ongoing' ? 'Ongoing' : 'Upcoming'}
                </span>
              </div>
              <div className="listing-grid-card-body">
                <div className="listing-grid-card-topline">{item.car.model}</div>
                <div className="listing-grid-card-date-row">
                  <span className="listing-grid-card-date-label">Ended On:</span>
                  <span className="listing-grid-card-date">${item.highest_bid || 0}</span>
                </div>
                <div className="listing-grid-card-desc">
                  {item.car.description && item.car.description.length > 110 ? 
                    item.car.description.slice(0, 110) + '...' : 
                    item.car.description || 'Well-maintained vehicle with excellent features and performance.'
                  }
                </div>
                <div className="listing-grid-card-tags">
                  <span className="listing-grid-card-tag">{item.car.odometer_reading || '78,000'} km</span>
                  <span className="listing-grid-card-tag">{item.car.transmission_type || 'Automatic'}</span>
                  <span className="listing-grid-card-tag">{item.car.engine_size || '2.8L engine'}</span>
                  {item.car.features && item.car.features.slice(0, 2).map((feature, i) => (
                    <span className="listing-grid-card-tag" key={i}>{feature}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )) : (
          <div className="listing-grid-empty">There are no {status} auctions</div>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;
