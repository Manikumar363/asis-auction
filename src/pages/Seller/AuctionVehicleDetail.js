import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Table } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SellerLayout from "../../components/Layout/Layout/SellerLayout";
import BiddingHistoryModal from "../../components/Modal/BiddingHistoryModal";
import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
} from "../../features/VehicleSlice";
import axios from "../../utils/axios";
import { parseError } from "../../utils/parseError.js";
import PageNotFound from "../PageNotFound";
import AuctionVehicleDetailTable from "./AuctionVehicleDetailTable";
import DynamicModal from "./DynamicModal";
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
const AuctionVehicleDetail = () => {
  const { isFetching } = useSelector((state) => state.vehicle);
  const [fetchError, setFetchError] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { auctionId } = useParams();
  const [auction, setAuction] = useState([]);
  const [highestBid, setHighestBid] = useState([]);
  const [highestBidId, setHighestBidId] = useState([]);
  const [car, setCar] = useState();
  const [bids, setBids] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cnfmModal, setcnfmModal] = useState(false);
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [intervalId, setIntervalId] = useState(null);
  const handleBiddingHistory = () => {
    setShowModal(true);
  };
  const fetchDetails = async () => {
    dispatch(GetCarsStart());
    try {
      const { data } = await axios.get(
        `/api/user/get-user-auction-details/${auctionId}`,
        {
          headers: { Authorization: token },
        }
      );
      console.log(data);
      setHighestBid(data.auction?.highest_bid);
      if (data.bids.length > 0) {
        setHighestBidId(data.bids[0]._id);
        setBids(data.bids);
      }

      setAuction(data.auction);
      setCar(data.auction?.car);
      const auctionStartTime = new Date(data.auction?.auction_start); // Calculate the remaining time
      if (data.auction?.status == "inactive") {
        const intervalId = setInterval(() => {
          const currentTime = new Date();
          let timeDifference;
          if (data.auction?.status == "inactive") {
            timeDifference = auctionStartTime - currentTime;
          }

          const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          setTimer({
            days,
            hours,
            minutes,
            seconds,
          });
          if (timeDifference <= 0) {
            clearInterval(intervalId);
            fetchDetails();
          }
        }, 1000);

        setIntervalId(intervalId);
      }
      dispatch(GetCarsSuccess(data));
    } catch (error) {
      setFetchError(true);
      dispatch(GetCarsFailure());
    }
  };
  useEffect(() => {
    fetchDetails();

    // Call the fetch data function when the component mounts
  }, [auctionId, token]);
  const handleEditClick = () => {
    navigate(`/dashboard/user/edit-car-details/${auction?.car._id}`);
  };
  const showHighestBid = auction?.bids && auction?.bids.length > 0;

  const handleConfirmationYes = async () => {
    setcnfmModal(false);
    try {
      const { data } = await axios.post(
        `/api/auction/confirm-bid/${auctionId}`,
        {
          bidId: highestBidId,
        },
        {
          headers: { Authorization: token },
        }
      );
      // console.log(data);
      toast.success("Confirmation Mail sent!", successToastOptions);
      window.location.reload();
    } catch (error) {
      const errorMessage = parseError(error);

      toast.error(errorMessage, ErrorToastOptions);
    }
  };

  const handleConfirmationNo = () => {
    setcnfmModal(false);
    // You can add additional handling or feedback for the user if needed
  };
  const handlePay = (auctionId, HighestBid) => {
    // alert(HighestBid);
    navigate(`/paymentgateway/${auctionId}`, {
      state: { bidAmount: HighestBid },
    });
  };
  const hasAuctionEnded =
    timer.days <= 0 &&
    timer.hours <= 0 &&
    timer.minutes <= 0 &&
    timer.seconds <= 0;
  if (hasAuctionEnded) {
    // fetchDetails();
  }
  const handleContact = (auctionId) => {
    // console.log(Buyer, Seller);
    // if (Seller && Buyer) {
    setSelectedAuction(auctionId);
    setShowContactModal(true);
    // } else {
    //   alert(
    //     "Wait Buyer to pay the token amount ! We will Mail you simultaneously"
    //   );
    // }
    // Set the selected auction and show the modal
  };

  const handleCloseContactModal = () => {
    // Reset state and close the modal
    setSelectedAuction(null);
    setShowContactModal(false);
  };
  const formatData = (date) => {
    return new Date(date).toLocaleString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
  };

  return (
    <SellerLayout>
      {fetchError ? (
        <PageNotFound />
      ) : (
        <>
          <h3>Auction Details</h3>

          <AuctionVehicleDetailTable
            auction={auction}
            timer={timer}
            formatData={formatData}
            handleConfirmationYes={handleConfirmationYes}
            handleContact={handleContact}
          />
          <ReactPlaceholder
            type="text"
            color="#F0F0F0"
            showLoadingAnimation
            rows={5}
            style={{ width: "80%" }}
            ready={!isFetching}
          >
            <div className="container mt-1">
              <Card className="seller-Car-card">
                <div className="seller-vehicle-head">
                  {/* <ProductCarousel carId={car._id} /> */}
                  <div className="d-flex w-100 justify-content-between">
                    <div className="car-details">
                      <div className="up-content clearfix">
                        <h2>{car?.model}</h2>
                        <span>Asking Price $ {auction?.asking_price}</span>

                        <br />
                      </div>
                      {showHighestBid && (
                        <span>Highest Bid $ {highestBid}</span>
                      )}
                    </div>
                    <div>
                      {" "}
                      <button
                        onClick={() => {
                          handleBiddingHistory();
                        }}
                        className="advanced-button w-100"
                      >
                        See Bidding Status
                      </button>
                    </div>
                  </div>
                </div>
                <div className="details">
                  <div className="head-side-bar">
                    <h4>Auction Details</h4>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li>
                            <span>Auction Start Date:</span>
                            {formatData(auction?.auction_start)}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li>
                            <span>Auction End Date:</span>
                            {formatData(auction?.auction_end)}
                          </li>
                          <li>
                            {auction?.seller_type == "company" && (
                              <>
                                {" "}
                                <span>Company Name:</span>{" "}
                                {auction?.company_name}
                                {/* <span>Company Name:</span> {auction?.company_name} */}
                              </>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="details">
                  <div className="head-side-bar">
                    <h4>Vehicle Details</h4>
                  </div>
                  <div
                    className=" Edit-box text-end"
                    onClick={() => {
                      handleEditClick();
                    }}
                  >
                    <span className="mr-1 ">Edit</span>
                    <i className="fas fa-edit "></i>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li>
                            <span>Manufacturing Year:</span>
                            {car?.manufacture_year}
                          </li>
                          <li>
                            <span>Fuel Type:</span>
                            {car?.fuel_type}
                          </li>
                          <li>
                            <span>No of Cylinders</span> {car?.num_of_cylinders}
                          </li>
                          <li>
                            <span>Transmission:</span> {car?.transmission_type}
                          </li>{" "}
                          {car?.vehicle_type == "Car" ? (
                            <>
                              {" "}
                              <li>
                                <span>Engine Capacity:</span>{" "}
                                {car?.engine_capacity}
                              </li>
                            </>
                          ) : (
                            <>
                              {" "}
                              <li>
                                <span>Engine Power:</span> {car?.engine_power}
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li>
                            <span>Color:</span> {car?.color}
                          </li>

                          <li>
                            <span>Odometer:</span>
                            {car?.odometer_reading}
                          </li>
                          <li>
                            <span>Vin No:</span>{" "}
                            {car?.unique_identification_number}
                          </li>
                          <li>
                            <span>Make:</span> {car?.manufacture_company}
                          </li>
                          {car?.body_type && (
                            <>
                              <li>
                                <span>Body Type:</span> {car?.body_type}
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="details">
                  <div className="head-side-bar">
                    <h4>Location Details</h4>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li>
                            <span>State:</span>
                            {car?.car_state}
                          </li>{" "}
                          <li>
                            <span>Suburb:</span>
                            {car?.car_shuburb}
                          </li>
                          <li>
                            <span>Postal Code:</span>
                            {car?.car_postal_code}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li>
                            <span>City:</span> {car?.car_city}
                          </li>
                          <li>
                            <span>Address:</span> {car?.car_address}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </ReactPlaceholder>
          {bids && bids[0] && (
            <>
              <Modal show={showContactModal} onHide={handleCloseContactModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Contact Buyer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {auction?.is_Seller_paid10_percent &&
                  auction?.is_Winner_paid10_percent ? (
                    <>
                      <Table striped>
                        <tbody>
                          <tr>
                            <td>Buyer Name</td>
                            <td></td>
                            <td>{bids[0].bidder.firstname  } { bids[0].bidder.lastname}</td>
                          </tr>
                          <tr>
                            <td>Buyer Email</td>
                            <td></td>
                            <td>{bids[0].bidder.email}</td>
                          </tr>{" "}
                          <tr>
                            <td>Buyer Phone No</td>
                            <td></td>
                            <td>{bids[0].bidder.phone}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  ) : (
                    <>
                      {" "}
                      Wait Buyer to Pay amount ! We have sent the Buyer mail
                      about your payment. If Buyer do not responded within Time
                      Limit.We will refund your amount .You can Contact us in
                      any Query from Contact Us Page
                    </>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseContactModal}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}

          <BiddingHistoryModal
            showModal={showModal}
            handleClose={() => setShowModal(false)}
            AuctionId={auctionId}
          />
          <DynamicModal
            show={cnfmModal}
            onHide={handleConfirmationNo}
            title="Confirmation"
            body="Are you sure you want to confirm the buyer?"
            onYes={handleConfirmationYes}
            onNo={handleConfirmationNo}
          />
        </>
      )}
    </SellerLayout>
  );
};

export default AuctionVehicleDetail;
