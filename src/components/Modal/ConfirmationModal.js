import React from "react";
import { Modal } from "react-bootstrap";

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Body>
        <p>Are you sure you want to delete ?</p>
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>Confirm</button>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
