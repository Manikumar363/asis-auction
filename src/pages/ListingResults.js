import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout/Layout";
import PageHeading from "../components/Layout/PageHeading";
import FeaturedItem from "../components/VehicleComponent";
import { GetAuctions } from "../features/apiCall";

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
  const [filterOptions, setFilterOptions] = useState([]);
  const [startSearch, setStartSearch] = useState(false);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.auction);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <PageHeading title={vehicle_type} />
      <section className="listing-page">
        <div className="container">
          <div className="row">
            <div id="listing-cars" className="col-md-9">
              <div className="pre-featured">
                <div className="info-text">
                  <ReactPlaceholder
                    type="text"
                    color="#F0F0F0"
                    showLoadingAnimation
                    rows={1}
                    style={{ width: "15%" }}
                    ready={!isFetching}
                  >
                    <h4>{auctions.length} results found</h4>
                  </ReactPlaceholder>
                </div>

                <div className="right-content">
                  <div className="input-select">
                    <select
                      name="status"
                      value={selectedStatus}
                      onChange={(e) => {
                        setSelectedStatus(e.target.value);
                        handleFilter(e.target.value);
                      }}
                    >
                      <option value="">Select Status</option>
                      <option value="active">Ongoing</option>
                      <option value="inactive">Not Started</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
              <ReactPlaceholder
                type="text"
                color="#F0F0F0"
                showLoadingAnimation
                rows={5}
                style={{ width: "80%" }}
                ready={!isFetching}
              >
                {auctions && auctions.length == 0 ? (
                  <>
                    <h4 className="text-success text-center">
                      No auctions Live !{" "}
                    </h4>
                  </>
                ) : (
                  <>
                    {auctions &&
                      auctions.map((auction, index) => (
                        <FeaturedItem
                          key={index}
                          id={auction?._id}
                          imageSrc={
                            auction?.car.images[0] ||
                            "/assets/images/noimage.jpeg"
                          }
                          title={auction?.car.model}
                          price={auction?.highest_bid}
                          description={auction?.car.description}
                          auctionId={auction?._id}
                          carId={auction?.car._id}
                          rating={4}
                          fuelType={auction?.car.fuel_type}
                          odometerReading={auction?.car.odometer_reading}
                          cityLocation={auction?.car.car_city}
                          status={auction?.status}
                        />
                      ))}
                  </>
                )}
              </ReactPlaceholder>
              <div className="pagination">
                <div className="page-numbers">
                  <ul>
                    {Array.from(
                      { length: totalNumberOfPages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <li
                        key={page}
                        className={page === currentPage ? "active" : ""}
                      >
                        <NavLink to="#" onClick={() => handlePageChange(page)}>
                          {page}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div id="sidebar" className="col-md-3">
              <div className="sidebar-content">
                <div className="head-side-bar">
                  <h4>Refine Your Search</h4>
                </div>
                <div className="search-form">
                  <div className=" mb-3">
                    <Form.Control
                      className="textbox"
                      type="text"
                      name="make"
                      placeholder="Make"
                      value={selectedManufacturer}
                      onChange={(e) => setSelectedManufacturer(e.target.value)}
                      required
                    />
                  </div>
                  <div className=" mb-3">
                    <Form.Control
                      className="textbox text-light"
                      type="text"
                      name="model"
                      value={selectedModel}
                      placeholder="Model"
                      onChange={(e) => setSelectedModel(e.target.value)}
                      required
                    />
                  </div>
                  <div className=" mb-3">
                    <Form.Control
                      className="textbox"
                      type="number"
                      name="selectedYear"
                      placeholder="Year"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      required
                    />
                  </div>
                  <div className="select mb-3">
                    <select
                      name="state"
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                    >
                      <option value="">Select State</option>
                      <option value="New South Wales">New South Wales</option>
                      <option value="Victoria">Victoria</option>
                      <option value="Queensland">Queensland</option>
                      <option value="Western Australia">
                        Western Australia
                      </option>
                      <option value="South Australia">South Australia</option>
                      <option value="Tasmania">Tasmania</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                  <NavLink onClick={handleFilter} className="p-c">
                    <button
                      className="advanced-button m-1"
                      disabled={isFetching}
                    >
                      {isFetching ? "Searching" : "Search Now"}
                      <i className="fa fa-search" />
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ListingResults;
