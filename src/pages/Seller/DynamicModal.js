import React from "react";
import { Button, Modal } from "react-bootstrap";

const DynamicModal = ({ show, onHide, title, body, onYes, onNo }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onNo}>
          No
        </Button>
        <Button variant="primary" onClick={onYes}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DynamicModal;
