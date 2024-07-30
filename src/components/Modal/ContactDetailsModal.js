// ContactDetailsModal.js
import React from "react";
import { Button, Modal } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import { useSelector } from "react-redux";

const ContactDetailsModal = ({
  showContactDetailsModal,
  handleClose,
  AuctionId,
}) => {
  // Add logic here to fetch contact details based on AuctionId if needed
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.vehicle);

  return (
    <Modal show={showContactDetailsModal} onHide={handleClose}>
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
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Contact Details</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Add content here */}
                <p>Contact details for Auction ID: {AuctionId}</p>
                {/* You can display the fetched contact details here */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </ReactPlaceholder>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">End Auction</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactDetailsModal;
