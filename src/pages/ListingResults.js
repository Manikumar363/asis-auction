import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout/Layout";
import { GetAuctions } from "../features/apiCall";
import "../styles/ListingResultsCustom.css";
import { DiselIcon,SpeedometerIcon,CityIcon, LinesIcon} from "../components/icons"; 

const ListingResults = () => {
  const location = useLocation();
  const { vehicle_type } = location.state || {};

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.auction);
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAuctions(dispatch, {
          selectedYear,
          selectedModel,
          selectedManufacturer,
          selectedStatus,
          currentPage,
          pageSize,
          selectedState,
          vehicle_type,
        });
        setAuctions(data.auctions);
        setTotalNumberOfPages(data.numOfPages);
        setStartSearch(false);
      } catch (error) {}
    };
    fetchData();
  }, [currentPage, pageSize, startSearch, token, vehicle_type]);

  const handleFilter = () => {
    setCurrentPage(1);
    if (
      selectedStatus ||
      selectedYear ||
      selectedManufacturer ||
      selectedModel ||
      selectedState ||
      vehicle_type
    ) {
      setStartSearch(true);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout>
      <div className="listing-banner">
        <img
          src={vehicle_type === "Truck"
            ? "/assets/images/Heavy-weight.png"
            : "/assets/images/Light-weight.png"}
          alt="Banner"
          className="listing-banner-img"
        />
        <div className="listing-banner-title">
          {vehicle_type === "Truck" ? "Heavy Weight Vehicles" : "Light Weight Vehicles"}
        </div>
      </div>
      <section className="listing-page">
        <div className="container">
          <div className="listing-filters-row">
            <input
              type="text"
              placeholder="Make"
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
            />
            <input
              type="text"
              placeholder="Model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            />
            <input
              type="number"
              placeholder="Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="New South Wales">New South Wales</option>
              <option value="Victoria">Victoria</option>
              <option value="Queensland">Queensland</option>
              <option value="Western Australia">Western Australia</option>
              <option value="South Australia">South Australia</option>
              <option value="Tasmania">Tasmania</option>
              <option value="Australia">Australia</option>
            </select>
            <button className="listing-search-btn" onClick={handleFilter}>
              Search Now
            </button>
          </div>
          <div className="listing-results-summary">
            <div className="listing-results-label">
              Based on your search <span>{auctions.length} results found</span>
            </div>
            <div className="listing-status-filter">
              <div className="status-select-wrapper">
                
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="closed">Closed</option>
                  <option value="active">Ongoing</option>
                  <option value="inactive">Not Started</option>
                </select>
              </div>
            </div>
          </div>
          <div className="listing-results-grid">
            {auctions.map((auction, index) => (
              <div className="listing-card-horizontal" key={index}>
                <div className="listing-card-image-section">
                  <img
                    src={auction?.car.images[0] || "/assets/images/noimage.jpeg"}
                    alt={auction?.car.model}
                    className="listing-card-image"
                  />
                  <span className="listing-status-badge">{auction.status}</span>
                </div>
                <div className="listing-card-details-section">
                  <div className="listing-card-header">
                    <div className="listing-card-title">
                      {auction?.car.model}
                    </div>
                    <div className="listing-card-price">
                      ${auction?.highest_bid}
                    </div>
                  </div>
                  <div className="listing-card-desc">
                    {auction?.car.description}
                  </div>
                  <div className="listing-card-attributes">
                    <span className="listing-attr">
                    <DiselIcon /> {auction?.car.fuel_type}
                    </span>
                    <span className="listing-attr">
                    <SpeedometerIcon/> {auction?.car.odometer_reading}
                    </span>
                    <span className="listing-attr">
                    <CityIcon /> {auction?.car.car_city}
                    </span>
                  </div>
                  <button className="listing-view-btn">View Details</button>
                  {auction?.bids?.length === 0 && (
                    <span className="listing-no-bids">No Bids</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="pagination">
            <div className="page-numbers">
              <ul>
                <li
                  className="pagination-arrow"
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  style={{ pointerEvents: currentPage === 1 ? "none" : "auto", opacity: currentPage === 1 ? 0.4 : 1 }}
                >
                  <span>&lt;</span>
                </li>
                {Array.from(
                  { length: totalNumberOfPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <li
                    key={page}
                    className={page === currentPage ? "active" : ""}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </li>
                ))}
                <li
                  className="pagination-arrow"
                  onClick={() => currentPage < totalNumberOfPages && handlePageChange(currentPage + 1)}
                  style={{ pointerEvents: currentPage === totalNumberOfPages ? "none" : "auto", opacity: currentPage === totalNumberOfPages ? 0.4 : 1 }}
                >
                  <span>&gt;</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ListingResults;