import SellerLayout from "../../components/Layout/Layout/SellerLayout";
// import { Row, Col, Card, Button, NavLink } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BiddingHistoryModal from "../../components/Modal/BiddingHistoryModal";
import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
} from "../../features/VehicleSlice.js";
import "../../styles/status.css";
import axios from "../../utils/axios";

const ErrorToastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const successToastOptions = {
  position: "top-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const AuctionStatus = () => {
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [AuctionId, SetAuctionId] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetCarsStart());
      try {
        const { data } = await axios.get("/api/user/get-all-user-auctions", {
          headers: { Authorization: token },
        });
        // console.log(data.auctions);
        setAuctions(data.auctions);
        // fetchDetails(data.auctions);
        dispatch(GetCarsSuccess(data));
      } catch (error) {
        dispatch(GetCarsFailure("Failed to fetch cars"));
      }
    };

    fetchData();
    fetchData();
  }, [selectedVehicleType]);

  const [showModal, setShowModal] = useState(false);

  const handleVehicleTypeChange = (type) => {
    setSelectedVehicleType(type);
    // const radioButtons = document.querySelectorAll('input[name="vehicleType"]');
    // radioButtons.forEach((radioButton) => {
    //   if (radioButton.checked) {
    //     radioButton.parentElement.classList.add("vehicle_check");
    //   } else {
    //     radioButton.parentElement.classList.remove("vehicle_check");
    //   }
    // });
  };

  const handleBiddingHistory = (auctionId) => {
    SetAuctionId(auctionId);
    setShowModal(true);
  };

  // const handleAuctionDetail = (auctionId) => {
  //   navigate(`/dashboard/user/auction-car/${auctionId}`);
  // };

  const handleActionStatus = (auctionId) => {
    navigate(`/dashboard/user/seeStatus/${auctionId}`);
  };
  const handleEndAuction = (auctionId) => {};

  const handleDeleteCar = async (auctionId) => {
    const ans = prompt("Are you sure want to delete the auction(Y/N)");

    if (ans && ans.toUpperCase() === "Y") {
      try {
        const { data } = await axios.delete(
          `api/user/delete-user-auction/${auctionId}`,
          {
            headers: { Authorization: token },
          }
        );
        const updatedAuctions = auctions.filter(
          (auction) => auction?._id !== auctionId
        );
        setAuctions(updatedAuctions);
        dispatch(GetCarsSuccess(data));
      } catch (error) {
        dispatch(GetCarsFailure("Failed to fetch cars"));
      }
    }
  };

  return (
    <SellerLayout>
      <h3>Auction Status</h3>
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-12">
          <ReactPlaceholder
            type="text"
            color="#F0F0F0"
            showLoadingAnimation
            rows={5}
            style={{ width: "80%" }}
            ready={!isFetching}
          >
            <div
              className={`d-flex w-25 m-auto justify-content-center vehicle_type_container mb-3`}
            >
              <div
                className={`vehicle_type_truck m-0 vehicle ${
                  selectedVehicleType === "Truck" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  id="truckRadio"
                  name="vehicleType"
                  className="d-none  "
                  checked={selectedVehicleType === "Truck"}
                  onChange={() => handleVehicleTypeChange("Truck")}
                />
                <label htmlFor="truckRadio" className="m-0">
                  <span className=" ">
                    <i className="fas fa-truck " />
                    <br />
                    <p className="d-inline " style={{ fontWeight: "10px" }}>
                      Heavy-weight
                    </p>
                  </span>
                </label>
              </div>
              <div
                className={`vehicle_type_car m-0 vehicle ${
                  selectedVehicleType === "Car" ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  id="carRadio"
                  name="vehicleType"
                  className="d-none "
                  checked={selectedVehicleType === "Car"}
                  onChange={() => handleVehicleTypeChange("Car")}
                />
                <label htmlFor="carRadio" className="m-0">
                  <span className="">
                    <i className="fas fa-car" />
                    <br />
                    <p className="d-inline " style={{ fontWeight: "10px" }}>
                      Light-weight
                    </p>
                  </span>
                </label>
              </div>
            </div>
            <div
              style={{
                height: "53vh",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "dark",
                overflow: "-moz-scrollbars-vertical",
              }}
            >
              {auctions.length > 0 ? (
                <>
                  {auctions
                    .filter((auction) => {
                      if (selectedVehicleType === "all") {
                        return true; // Show all auctions
                      } else {
                        return (
                          auction?.car &&
                          auction?.car.vehicle_type.toLowerCase() ===
                            selectedVehicleType.toLowerCase()
                        );
                      }
                    })

                    .map((auction, index) => (
                      <ul key={index} className="newest-auction">
                        <li>
                          {auction?.car && (
                            <div>
                              <div className="status-tooltip">
                                <div
                                  className={`status-popup ${
                                    auction?.status === "active"
                                      ? "Ongoing"
                                      : auction?.status === "inactive"
                                      ? "NotStarted"
                                      : "Closed"
                                  }`}
                                >
                                  {auction?.status === "active"
                                    ? "Ongoing"
                                    : auction?.status === "inactive"
                                    ? "Not Started"
                                    : "Closed"}
                                </div>
                              </div>
                              <img
                                src={
                                  auction?.car.images[0] ||
                                  "/assets/images/noimage.jpeg"
                                }
                                alt=""
                              />
                              <div className="info">
                                <h2 className="title">{auction?.car.model}</h2>
                                <div style={{ marginLeft: 10 }}>
                                  {auction?.status === "active" ? (
                                    <p>Reserve Met</p>
                                  ) : (
                                    <p>Reserve not Met</p>
                                  )}
                                </div>

                                {auction?.highest_bid === 0 ? (
                                  <>
                                    <h2 className="price">No Bids </h2>
                                    <p className="year">
                                      <span className="font-red-thunderbird">
                                        {" "}
                                        Placed Yet
                                      </span>
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <h2 className="price">
                                      {auction?.highest_bid}
                                    </h2>
                                    <p className="year">
                                      <span className="font-red-thunderbird">
                                        {" "}
                                        Highest Bid
                                      </span>
                                    </p>
                                  </>
                                )}

                                <p className="status">
                                  <span className={auction?.car.status}>
                                    {auction?.car.status}
                                  </span>
                                </p>
                                <ul className="p-0">
                                  <li>
                                    <Link
                                      to={
                                        auction && auction?._id
                                          ? `/dashboard/user/auction-car/${auction?._id}`
                                          : ""
                                      }
                                      className="text view-detail-button"
                                      style={{
                                        fontWeight: "bold",
                                        color: "black",
                                      }}
                                    >
                                      View Details
                                    </Link>
                                  </li>
                                  <li>
                                    <span className="font-weight-bold">
                                      VIN
                                    </span>
                                    {": "}
                                    {auction?.car.unique_identification_number}
                                    <br />
                                    {/* VIN Number */}
                                  </li>
                                  {/* <li>
                            {auction?.current_price}
                            <br />
                            Starting Bid.
                          </li> */}
                                  <li className="advanced-button bidding_history p-0">
                                    <NavLink
                                      onClick={() => {
                                        handleBiddingHistory(auction?._id);
                                      }}
                                      className="w-100 h-100 "
                                    >
                                      Bidding Status
                                    </NavLink>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </li>
                      </ul>
                    ))}
                </>
              ) : (
                <>
                  <h5 className="text-danger font-weight-bold mt-4">
                    No Auctions Created by you!
                  </h5>{" "}
                </>
              )}
            </div>
          </ReactPlaceholder>

          <BiddingHistoryModal
            showModal={showModal}
            handleClose={() => setShowModal(false)}
            AuctionId={AuctionId}
          />
        </div>
      </div>
    </SellerLayout>
  );
};

export default AuctionStatus;
