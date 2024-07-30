import { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Layout/DashboardHeader";
import Layout from "../../components/Layout/Layout/Layout";
import UserMenu from "../../components/Menu/UserMenu";
import PaymentMethod from "../../components/PaymentMethod";
import {
  GetAuctionsFailure,
  GetAuctionsStart,
  GetAuctionsSuccess,
} from "../../features/AuctionSlice";
import axios from "../../utils/axios.js";
import { parseError } from "../../utils/parseError";

const WonAuctions = () => {
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.auction);
  const dispatch = useDispatch();
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState("");
  const [values, setValues] = useState({
    seller_paid: "",
    winner_paid: "",
    seller: "",
    car: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetAuctionsStart());
      try {
        const { data } = await axios.get("/api/user/get-buyer-won-auctions", {
          headers: { Authorization: token },
        });
        // console.log(data);
        setAuctions(data?.wonBuyerAuctions);
        dispatch(GetAuctionsSuccess(data));
      } catch (error) {
        const errorMessage = parseError(error);
        dispatch(GetAuctionsFailure(errorMessage));
      }
    };
    fetchData();
  }, [dispatch, token]);

  const handleBidding = (auctionId) => {
    navigate(`/auction/${auctionId}`);
  };
  const handleContact = (auctionId, seller_paid, winner_paid, seller, car) => {
    // console.log(auctionId);

    // Set the values into the state
    setValues({
      seller_paid: seller_paid,
      winner_paid: winner_paid,
      seller: seller,
      car: car,
    });

    setSelectedAuction(auctionId);
    setShowContactModal(true);
  };

  const handleCloseContactModal = () => {
    // Reset state and close the modal
    setSelectedAuction(null);
    setShowContactModal(false);
  };
  return (
    <Layout>
      <Container className="admin-dashboard">
        <DashboardHeader />
        {/* <DashboardHeader /> */}
        <div className="account-container row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 admin-details">
            <h3 className=" ">Won Auctions</h3>
            <ReactPlaceholder
              type="text"
              color="#F0F0F0"
              showLoadingAnimation
              rows={10}
              style={{ width: "80%" }}
              ready={!isFetching}
            >
              {auctions ? (
                <>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Model</th>
                        {/* <th>Vin Number</th> */}
                        <th>Your Auction Amount</th>
                        <th>Your Auction Date/Time</th>
                        <th>Current Status</th>
                        <th>To Do Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auctions &&
                        auctions.map((auction, index) => (
                          <>
                            <tr key={index}>
                              <td>{auction?.auction?.car?.model}</td>
                              <td>{auction?.auction?.highest_bid}</td>
                              <td>
                                {new Date(auction?.createdAt).toLocaleString()}
                              </td>
                              <td>
                                <p className="text-success font-weight-bold">
                                  <NavLink
                                    onClick={() => handleBidding(auction?._id)}
                                    className="text-success font-weight-bold"
                                  >
                                    {auction?.is_confirmed_bid && (
                                      <>
                                        {" "}
                                        {auction?.auction
                                          ?.is_Seller_paid10_percent &&
                                        auction?.auction
                                          ?.is_Winner_paid10_percent ? (
                                          <>AUCTION WON</>
                                        ) : (
                                          <> SELLER CONFIRMED</>
                                        )}
                                      </>
                                    )}
                                  </NavLink>
                                </p>
                              </td>
                              <td>
                                {!auction?.auction?.is_Winner_paid10_percent ? (
                                  <>
                                    {auction?.is_confirmed_bid && (
                                      <>
                                        <p>
                                          Pay administrative amount i.e $100 to
                                          Contact Seller
                                        </p>

                                        <PaymentMethod
                                          auctionId={auction?.auction?._id}
                                        />

                                        <p>
                                          Note: If you have Paid the amount !
                                          Kindly wait for some time.We will Mail
                                          you Simultaneously
                                        </p>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {" "}
                                    <Button
                                      onClick={() =>
                                        handleContact(
                                          auction?.auction?._id,
                                          auction?.auction
                                            ?.is_Seller_paid10_percent,
                                          auction?.auction
                                            ?.is_Winner_paid10_percent,
                                          auction?.auction?.seller,
                                          auction?.auction?.car
                                        )
                                      }
                                      className="mt-0"
                                    >
                                      Contact Seller
                                    </Button>
                                  </>
                                )}
                              </td>
                            </tr>
                            <Modal
                              show={showContactModal}
                              onHide={handleCloseContactModal}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  Contact Buyer {auction?.auction?.car?.model}
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                {values.seller_paid && values.winner_paid ? (
                                  <>
                                    {" "}
                                    <Table>
                                      <tbody>
                                        <tr>
                                          <td>Seller Name</td>
                                          <td>
                                            {values?.seller?.firstname}
                                            {values?.seller?.middlename}
                                            {values?.seller?.lastname}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Seller Email</td>
                                          <td>{values?.seller?.email}</td>
                                        </tr>
                                        {/* <tr>
                                          <td>Seller Phone No</td>
                                          <td>{values?.seller?.phoneNumber}</td>
                                        </tr> */}
                                        <tr>
                                          <td>Car Address</td>
                                          <td>{values?.car?.car_address}</td>
                                        </tr>
                                        <tr>
                                          <td>Car State</td>
                                          <td>{values?.car?.car_state}</td>
                                        </tr>
                                        <tr>
                                          <td>Car City</td>
                                          <td>{values?.car?.car_city}</td>
                                        </tr>
                                        <tr>
                                          <td>Car Suburb</td>
                                          <td>{values?.car?.car_shuburb}</td>
                                        </tr>
                                        <tr>
                                          <td>Car Pincode</td>
                                          <td>
                                            {values?.car?.car_postal_code}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </Table>
                                  </>
                                ) : (
                                  <>
                                    Wait Seller to Pay Token amount ! We have
                                    sent the Seller mail about your payment. If Buyer did not responded within Time Limit.We
                                    will refund your amount .You can Contact us
                                    in any Query from Contact Us page.
                                  </>
                                )}
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleCloseContactModal}
                                >
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        ))}
                    </tbody>
                  </Table>
                </>
              ) : (
                <>
                  <h5 className="text-danger font-weight-bold mt-4">
                    No Auctions Won!
                  </h5>{" "}
                  <NavLink
                    to="/SeeAll"
                    className=" font-weight-bold btn btn-success mt-4"
                  >
                    {" "}
                    Start Bidding{" "}
                  </NavLink>
                </>
              )}
            </ReactPlaceholder>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default WonAuctions;
