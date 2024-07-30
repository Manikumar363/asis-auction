import React, { useEffect, useState } from "react";
import { Container, NavLink, Table } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DashboardHeader from "../../components/Layout/DashboardHeader";
import Layout from "../../components/Layout/Layout/Layout";
import UserMenu from "../../components/Menu/UserMenu";
import {
  GetAuctionsFailure,
  GetAuctionsStart,
  GetAuctionsSuccess,
} from "../../features/AuctionSlice";
import axios from "../../utils/axios.js";
import { parseError } from "../../utils/parseError";

const UserBiddingHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.auction);
  const dispatch = useDispatch();
  const [bids, setBids] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetAuctionsStart());
      try {
        const { data } = await axios.get(`/api/user/get-all-bids`, {
          headers: { Authorization: token },
        });
        // console.log(data);

        setBids(data.bids);

        dispatch(GetAuctionsSuccess(data));
      } catch (error) {
        const errorMessage = parseError(error);
        dispatch(GetAuctionsFailure(errorMessage));
      }
    };

    fetchData();
  }, [dispatch, token]);

  const handleBid = (auctionId) => {
    navigate(`/auction/${auctionId}`);
  };
  return (
    <Layout>
      <Container className="admin-dashboard">
        <DashboardHeader />

        <div className="account-container row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 admin-details">
            <h3 className=" ">Bidding History</h3>
            <p>
              Note: If your Bid is confirmed by Seller ! You can further proceed
              in{" "}
              <Link
                to="/dashboard/user/auctions_won "
                className=" font-weight-bold text-capitalize text-dark"
                style={{ textDecoration: "underline" }}
              >
                AUCTIONS WON
              </Link>{" "}
              Page
            </p>
            <ReactPlaceholder
              type="text"
              color="#F0F0F0"
              showLoadingAnimation
              rows={10}
              style={{ width: "80%" }}
              ready={!isFetching}
            >
              {bids.length > 0 ? (
                <>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Model</th>

                        <th>Your Bid Amount</th>
                        <th>Your Bid Date/Time</th>
                        <th>Current Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      <ReactPlaceholder
                        type="text"
                        rows={4}
                        ready={!isFetching}
                        showLoadingAnimation
                        style={{ width: "100%" }}
                      >
                        {bids.map((bid, index) => (
                          <tr key={index}>
                            <td>{bid.auction && bid.auction?.car.model}</td>

                            <td>{bid.auction && bid.bid_amount}</td>
                            <td>
                              {new Date(
                                bid.auction && bid.createdAt
                              ).toLocaleString()}
                            </td>

                            <td>
                              <>
                                {" "}
                                {bid.auction &&
                                bid.auction?.highest_bid &&
                                bid.auction?.highest_bid > bid.bid_amount ? (
                                  <>
                                    {bids.filter(
                                      (b) => b.auction?._id === bid.auction?._id
                                    ).length > 1 ? (
                                      <p className="text-info font-weight-bold">
                                        You have placed a new bid!
                                      </p>
                                    ) : (
                                      <>
                                        {" "}
                                        <p>
                                          <NavLink
                                            onClick={() =>
                                              handleBid(bid.auction?._id)
                                            }
                                            className="text-danger font-weight-bold"
                                          >
                                            You Lost! Place new bid
                                          </NavLink>
                                        </p>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {bid?.is_confirmed_bid === true ||
                                    bid?.auction?.status == "closed" ? (
                                      <>
                                        <p className="text-success font-weight-bold">
                                          <p className="text-success font-weight-bold">
                                            Auction Won!
                                            {bid?.is_confirmed_bid && (
                                              <>{"  "}Seller Confirmed</>
                                            )}
                                            {bid?.auction?.status == "closed" &&
                                              !bid?.is_confirmed_bid && (
                                                <>
                                                  <br />
                                                  Wait for Seller to Confirm
                                                  your Bid
                                                </>
                                              )}
                                          </p>
                                        </p>
                                      </>
                                    ) : (
                                      <>
                                        <p className="text-success font-weight-bold">
                                          <p
                                            onClick={() =>
                                              handleBid(bid.auction?._id)
                                            }
                                            className="text-success font-weight-bold"
                                          >
                                            Your bid is still on
                                          </p>
                                        </p>
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            </td>
                          </tr>
                        ))}
                      </ReactPlaceholder>
                    </tbody>
                  </Table>
                </>
              ) : (
                <>
                  <h5 className="text-danger font-weight-bold mt-4">
                    No Bidding!
                  </h5>{" "}
                </>
              )}
            </ReactPlaceholder>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default UserBiddingHistory;
