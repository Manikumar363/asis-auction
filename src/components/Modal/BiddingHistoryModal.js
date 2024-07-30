import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { useDispatch, useSelector } from "react-redux";

import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
} from "../../features/VehicleSlice";
import axios from "../../utils/axios";

const BiddingHistoryModal = ({ showModal, handleClose, AuctionId }) => {
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  const [bids, setBids] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetCarsStart());
      try {
        const { data } = await axios.get(
          `/api/bidding/get-auction-bids/${AuctionId}`,
          {
            headers: { Authorization: token },
          }
        );

        await setBids(data.bids);
        console.log("bids", data);
        dispatch(GetCarsSuccess(data));
      } catch (error) {
        dispatch(GetCarsFailure("Failed to fetch vehicles"));
      }
    };

    fetchData();
  }, [AuctionId, dispatch, token]);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Bidding History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactPlaceholder
          type="text"
          rows={10}
          ready={!isFetching}
          showLoadingAnimation
        >
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Bidder ID</th>
                <th>Bidder Name</th>
                <th>Bid Amount</th>
                <th>Bid Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {bids.length <= 0 ? (
                <>No Bids Placed</>
              ) : (
                <>
                  {bids.map((bid, index) => (
                    <tr key={index}>
                      <td>{bid?.bidder?.clientId}</td>
                      <td>{bid?.bidder?.firstname}</td>
                      <td>{bid.bid_amount}</td>
                      <td>{new Date(bid.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </Table>
        </ReactPlaceholder>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BiddingHistoryModal;
