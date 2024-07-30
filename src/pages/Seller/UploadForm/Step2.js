import React, { useEffect, useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";

const Step2 = ({ formData, setFormData, prevStep, nextStep }) => {
  const [inputErrors, setInputErrors] = useState({});
  const [isFormComplete, setIsFormComplete] = useState(false);
  // const toCapitalize = (inputString) => {
  //   return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    if (name === "color" || name === "body_type") {
      updatedValue = value.toUpperCase();
    }

    setFormData({ ...formData, [name]: updatedValue });
  };
  const Input = () => {};
  useEffect(() => {
    const checkFormCompleteness = () => {
      const requiredFields = ["fuel_type", "transmission_type"];
      const formComplete = requiredFields.every(
        (field) => formData[field] !== undefined && formData[field] !== ""
      );
      setIsFormComplete(formComplete);
    };

    checkFormCompleteness();
  }, [formData]);
  const axleConfigurations = [
    "Single Axle (SA)",
    "Tandem Axle (TA)",
    "Tri-Axle (3A)",
    "Quad Axle (4A)",
    "5-Axle (5A)",
    "6-Axle (6A)",
    "Single Drive Axle (SDD)",
    "Tandem Drive Axle (TDD)",
    "Tag Axle",
    "Pusher Axle",
    "Lift Axle",
    "6x8", // Add the custom axle configuration
  ];
  return (
    <div>
      <h4>Step 2: Vehicle Features</h4>
      <hr />
      <div className="seller-upload-form">
        <table className="form-table">
          <tbody>
            <tr>
              <td>
                <Form.Label className="font-weight-bold">Color :</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label className="font-weight-bold">
                  Fuel Type
                  <sup className="text-danger font-weight-bold">*</sup>:
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  as="select"
                  name="fuel_type"
                  value={formData.fuel_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Fuel Type</option>
                  <option value="PETROL">PETROL</option>
                  <option value="DIESEL">DIESEL</option>
                  <option value="CNG">GAS</option>
                  <option value="UNLEADED">UNLEADED</option>
                  <option value="PREMIUM UNLEADED">PREMIUM UNLEADED</option>
                  <option value="HYBRID">HYBRID</option>
                  <option value="ELECTRIC">ELECTRIC</option>
                  <option value="OTHER">OTHER</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label className="font-weight-bold">Body Type</Form.Label>
              </td>
              <td>
                {formData.vehicle_type == "Truck" ? (
                  <Form.Control
                    type="text"
                    name="body_type"
                    value={formData.body_type}
                    onChange={handleInputChange}
                  />
                ) : (
                  <>
                    <Form.Control
                      as="select"
                      name="body_type"
                      value={formData.body_type}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Body Type</option>
                      <option value="SEDAN">SEDAN</option>
                      <option value="HATCHBACK">HATCHBACK</option>
                      <option value="VAN">VAN</option>
                      <option value="UTE">UTE</option>
                      <option value="SUV">SUV</option>
                      <option value="CONVERTIBLE">CONVERTIBLE</option>
                      <option value="COUPE">COUPE</option>
                      <option value="WAGON">WAGON</option>
                      <option value="OTHER">OTHER</option>
                    </Form.Control>
                  </>
                )}{" "}
              </td>
            </tr>

            {formData.vehicle_type == "Truck" && (
              <>
                <tr>
                  <td>
                    <Form.Label className="font-weight-bold">
                      Axle Configuration
                      <sup className="text-danger font-weight-bold">*</sup>:
                    </Form.Label>
                  </td>
                  <td>
                    <Form.Control
                      as="select"
                      name="axle_configuration"
                      value={formData.axle_configuration}
                      onChange={handleInputChange}
                    >
                      <option value="">Select an axle configuration</option>
                      {axleConfigurations.map((config, index) => (
                        <option key={index} value={config}>
                          {config}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="font-weight-bold">GVM</Form.Label>
                    <sup className="text-danger font-weight-bold">*</sup>:
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>( Gross Vehicle Mass )</Tooltip>}
                    >
                      <span className="ml-2">
                        <i className="fas fa-info-circle text-dark"></i>
                      </span>
                    </OverlayTrigger>
                  </td>
                  <td>
                    {" "}
                    <Form.Control
                      type="number"
                      name="gvm"
                      placeholder="Enter GVM in kg"
                      value={formData.gvm}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </>
            )}

            <tr>
              <td>
                <Form.Label className="font-weight-bold">
                  Transmission Type{" "}
                  <sup className="text-danger font-weight-bold">*</sup>:
                </Form.Label>
              </td>
              <td>
                <Form.Check
                  type="radio"
                  name="transmission_type"
                  id="auto"
                  label="AUTO"
                  checked={formData.transmission_type === "Automatic"}
                  onChange={() =>
                    handleInputChange({
                      target: { name: "transmission_type", value: "Automatic" },
                    })
                  }
                />
                <Form.Check
                  type="radio"
                  name="transmission_type"
                  id="manual"
                  label="MANUAL"
                  checked={formData.transmission_type === "Manual"}
                  onChange={() =>
                    handleInputChange({
                      target: { name: "transmission_type", value: "Manual" },
                    })
                  }
                />
              </td>
            </tr>
            {formData.vehicle_type == "Truck" ? (
              <>
                {" "}
                <tr>
                  <td>
                    <Form.Label className="font-weight-bold">
                      Engine Power
                      <sup className="text-danger font-weight-bold">*</sup>:
                    </Form.Label>
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>In HP</Tooltip>}
                    >
                      <span className="ml-2">
                        <i className="fas fa-info-circle text-dark"></i>
                      </span>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="engine_power"
                      value={formData.engine_power}
                      placeholder="Enter Engine Power "
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                </tr>
              </>
            ) : (
              <>
                <tr>
                  <td>
                    <Form.Label className="font-weight-bold">
                      Engine Capacity   <sup className="text-danger font-weight-bold">*</sup> :
                   
                    </Form.Label>
                    <OverlayTrigger
                      placement="right"
                      overlay={<Tooltip>In CC</Tooltip>}
                    >
                      <span className="ml-2">
                        <i className="fas fa-info-circle text-dark"></i>
                      </span>
                    </OverlayTrigger>
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="engine_capacity"
                      value={formData.engine_capacity}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                </tr>
              </>
            )}

            <tr>
              <td>
                <Form.Label className="font-weight-bold">
                  Odometer Reading<sup className="text-danger font-weight-bold">*</sup>
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  type="number"
                  name="odometer_reading"
                  value={formData.odometer_reading}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label className="font-weight-bold">
                  Drive Type:
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  as="select" // Use "as" prop to render a select element
                  name="drive_type"
                  value={formData.drive_type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Drive Type</option>
                  <option value="RWD">RWD</option>
                  <option value="AWD">AWD</option>
                  <option value="FWD">FWD</option>
                  <option value="4WD">4WD</option>
                </Form.Control>
              </td>
            </tr>

            <tr>
              <td>
                <Form.Label className="font-weight-bold">
                  Number of Cylinders  <sup className="text-danger font-weight-bold">*</sup> :
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  type="number"
                  name="num_of_cylinders"
                  value={formData.num_of_cylinders}
                  onChange={handleInputChange}
                  // isInvalid={!!inputErrors.num_of_cylinders}
                />
                {/* {formData.num_of_cylinders &&
                  (formData.num_of_cylinders < 2 ||
                    formData.num_of_cylinders > 32) && (
                    <div className="text-danger">
                      No of Cylinders must be between 2 and 32.
                    </div>
                  )} */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="m-3">
        <button className="advanced-button" onClick={prevStep}>
          Previous
        </button>
        <button
          className="advanced-button"
          onClick={nextStep}
          disabled={!isFormComplete}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
