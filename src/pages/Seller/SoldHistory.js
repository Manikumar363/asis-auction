import SellerLayout from "../../components/Layout/Layout/SellerLayout";
// import { Row, Col, Card, Button, NavLink } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BiddingHistoryModal from "../../components/Modal/BiddingHistoryModal";
import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
} from "../../features/VehicleSlice";
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
const SoldHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  // const [fetchError, setFetchError] = useState(false);
  const [AuctionId, SetAuctionId] = useState([]);

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetCarsStart());
      try {
        const { data } = await axios.get("/api/user/get-seller-won-auctions", {
          headers: { Authorization: token },
        });
        console.log(data);
        setAuctions(data.wonAuctions);
        dispatch(GetCarsSuccess(data));
      } catch (error) {
        // setFetchError(true);
        dispatch(GetCarsFailure("Failed to fetch cars"));
      }
    };

    // Call the fetchData function
    fetchData();
  }, [dispatch, token]);

  const handleBiddingHistory = (auctionId) => {
    SetAuctionId(auctionId);
    setShowModal(true);
  };

  const handleAuctionDetail = (auctionId) => {
    navigate(`/dashboard/user/auction-car/${auctionId}`);
  };
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
        dispatch(GetCarsSuccess(data)); // Dispatch the action with the fetched data
      } catch (error) {
        // console.log(error);
        dispatch(GetCarsFailure("Failed to fetch cars"));
        // Dispatch the action with the error message
      }
    } else {
      // console.log("Deletion canceled by the user");
      // You can add additional handling or feedback for the user if needed
    }
  };

  return (
    <SellerLayout>
      <h3>Sold History</h3>
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-12">
          <>
            <ReactPlaceholder
              type="text"
              color="#F0F0F0"
              showLoadingAnimation
              rows={5}
              style={{ width: "80%" }}
              ready={!isFetching}
            >
              <div
                style={{
                  height: "53vh",
                  overflowY: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "dark",
                  overflow: "-moz-scrollbars-vertical",
                }}
              >
                {auctions ? (
                  <>
                    {auctions.map((auction, index) => (
                      <ul key={index} className="newest-auction sold-history">
                        <li>
                          {auction?.car && (
                            <div>
                              {auction?.car.images && auction?.car.images[0] ? (
                                <img src={auction?.car.images[0]} alt="" />
                              ) : (
                                <>
                                  <img
                                    src="/assets/images/noimage.jpeg"
                                    alt=""
                                  />
                                </>
                              )}

                              <div className="info">
                                <h2 className="title">{auction?.car.model}</h2>
                                <div>
                                  <NavLink
                                    onClick={() =>
                                      handleAuctionDetail(auction?._id)
                                    }
                                    className="text view-detail-button"
                                    style={{
                                      textShadow:
                                        "2px 2px 4px rgba(0, 0, 0, 0.3)",
                                      fontWeight: "bold",
                                      color: "green",
                                    }}
                                  >
                                    View Details
                                  </NavLink>
                                </div>

                                {auction?.highest_bid > 0 ? (
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
                                      {auction?.highest_bid.bid_amount}
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
                                <ul>
                                  <li>
                                    {auction?.car.unique_identification_number}
                                    <br />
                                    VIN Number
                                  </li>
                                  <li>Sold On 12/10/2023</li>
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
                      No Auctions is Sold!
                    </h5>{" "}
                  </>
                )}
              </div>
            </ReactPlaceholder>
          </>

          {auctions && auctions.length > 0 && (
            <BiddingHistoryModal
              showModal={showModal}
              handleClose={() => setShowModal(false)}
              AuctionId={AuctionId}
            />
          )}
        </div>
      </div>
    </SellerLayout>
  );
};

export default SoldHistory;
