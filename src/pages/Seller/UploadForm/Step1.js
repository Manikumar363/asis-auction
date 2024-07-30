import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import {
  Button,
  Form,
  FormCheck,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

import { Link } from "react-router-dom";

const Step1 = ({ formData, setFormData, nextStep, prevStep }) => {
  const [dt, setdt] = useState()
  const handleInputChange = (e) => {
    
    const { name, value } = e.target || {};

  

 
    let updatedValue = value;

    if (name === "manufacture_company" || name === "model") {
      updatedValue = value.toUpperCase();
    }

    setFormData({ ...formData, [name]: updatedValue });
  };
  const [showDetails, setshowDetails] = useState(false);
  const [authorizedPerson, setAuthorizedPerson] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const currentYear = new Date().getFullYear();
  
  const [t_c_Checked, sett_c_Checked] = useState(false); //terms n conditions checkbox
  const isFormComplete = () => {
    return (
      formData.manufacture_company &&
      formData.model &&
      formData.manufacture_year &&
      formData.is_registered &&
      (formData.is_owner || formData.is_authorized_person)
    );
  };

  const handleOwnerCheckboxChange = (e) => {
    const { checked } = e.target;

    if (checked) {
      setAuthorizedPerson(false);
      setFormData({ ...formData, is_owner: true });
    } else {
      setFormData({ ...formData, is_authorized_person: true });
      setFormData({ ...formData, is_owner: false });
    }
  };

  const handleAuthorizedPersonCheckboxChange = (e) => {
    const { checked } = e.target;
    setAuthorizedPerson(checked);

    if (checked) {
      setShowModal(true);
      setFormData({ ...formData, is_authorized_person: true });
    } else {
      setFormData({ ...formData, is_authorized_person: false });
    }
  };

  const closeModal = () => {
    if (t_c_Checked) {
      setShowModal(false);
      setFormData({ ...formData, is_authorized_person: authorizedPerson });
    } else {
      // Handle the case where the checkbox is not checked, e.g., show an alert
      alert("Please agree to the Terms and Conditions before closing.");
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h4>Step 1: Vehicle Manufacturing Details</h4> <hr />
        <div className="seller-upload-form">
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <Form.Label className="font-weight-bold">
                    Make <sup className="text-danger font-weight-bold ">*</sup>:
                  </Form.Label>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="manufacture_company"
                    value={formData.manufacture_company}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label className="font-weight-bold">
                    Model <sup className="text-danger font-weight-bold ">*</sup>
                    :
                  </Form.Label>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label className="font-weight-bold">
                    Manufacture Year
                    <sup className="text-danger font-weight-bold">*</sup>:
                  </Form.Label>
                </td>
                <td>
                  <Form.Control
                    type="number"
                    name="manufacture_year"
                    value={formData.manufacture_year}
                    onChange={handleInputChange}
                    required
                    max={4}
                    min={4}
                  />
                  {/* {formData.manufacture_year &&
                  (formData.manufacture_year < 2010 ||
                    formData.manufacture_year > currentYear) && (
                    <div className="text-danger">
                      Manufacture year must be between 2010 and {currentYear}.
                    </div>
                  )} */}
                </td>
              </tr>

              <tr>
                <td>
                  <Form.Label className="font-weight-bold">
                    Is Registered
                    <sup className="text-danger font-weight-bold">*</sup> ?
                  </Form.Label>
                </td>

                <td>
                  <Form.Check
                    type="radio"
                    name="is_registered"
                    id="true"
                    label="Yes"
                    checked={formData.is_registered === "true"}
                    onChange={() => {
                      setshowDetails(true);
                      handleInputChange({
                        target: { name: "is_registered", value: "true" },
                      });
                    }}
                  />
                  <Form.Check
                    type="radio"
                    name="is_registered"
                    id="false"
                    label="No"
                    checked={formData.is_registered === "false"}
                    onChange={() => {
                      setshowDetails(false);
                      handleInputChange({
                        target: { name: "is_registered", value: "false" },
                      });
                    }}
                  />
                </td>
              </tr>
              {showDetails && (
                <>
                  <tr>
                    <td>
                      <Form.Label className="font-weight-bold">
                        Expiry Date
                        <sup className="text-danger font-weight-bold">*</sup>:
                      </Form.Label>
                    </td>
                    <td>
                      <DatePicker
                        name="expiry_date"
                        value={dt}
                        onChange={(e)=>{ setFormData({ ...formData, ["expiry_date"]: new Date(e)}); setdt(e)}}
                        format="DD/MM/YYYY"
                      
                      />
                    </td>
                  </tr>
                </>
              )}
              <tr>
                <td>
                  <Form.Label className="font-weight-bold">
                    VIN Number
                  </Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        A vehicle Identification Number (VIN) is a unique serial
                        number used by the automotive industry to identify
                        individual vehicles{" "}
                      </Tooltip>
                    }
                  >
                    <span className="ml-2">
                      <i className="fas fa-info-circle text-dark"></i>
                    </span>
                  </OverlayTrigger>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    name="unique_identification_number"
                    value={formData.unique_identification_number}
                    onChange={handleInputChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label className="font-weight-bold">
                    I am the Owner
                    <sup className="text-danger font-weight-bold ">*</sup>
                  </Form.Label>
                </td>
                <td>
                  <FormCheck
                    type="checkbox"
                    name="is_owner"
                    value={formData.is_owner}
                    checked={formData.is_owner}
                    onChange={handleOwnerCheckboxChange}
                    required
                    style={{ marginLeft: "10px", marginBottom: "30px" }}
                  />
                </td>
              </tr>
              {!formData.is_owner && (
                <tr>
                  <td>
                    <Form.Label className="font-weight-bold">
                      I am an Authorized Person
                      <sup className="text-danger font-weight-bold ">*</sup>
                    </Form.Label>
                  </td>
                  <td>
                    <FormCheck
                      value={formData.is_authorized_person}
                      checked={formData.is_authorized_person}
                      type="checkbox"
                      name="is_authorized_person"
                      onChange={handleAuthorizedPersonCheckboxChange}
                      style={{ marginLeft: "10px", marginBottom: "30px" }}
                      required
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Authorization Note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You must have approval or the owner has to be present to sign the
            paperwork.
            <Form.Check
              label={
                <h6 className="text-danger">
                  You agree on Terms and Conditions
                </h6>
              }
              onChange={(e) => sett_c_Checked(e.target.checked)}
              checked={t_c_Checked}
              style={{ borderColor: "black" }} // You can adjust the style as needed
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger">
              <Link to="/termsconditions" target="_blank">
                Terms and Conditions
              </Link>
            </Button>{" "}
            <Button variant="secondary" onClick={closeModal}>
              Next
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="m-3">
          <button className="advanced-button" onClick={prevStep}>
            Previous
          </button>
          <button
            className="advanced-button"
            onClick={nextStep}
            disabled={!isFormComplete()} // Disable the button if the form is not complete
          >
            Next
          </button>
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default Step1;
