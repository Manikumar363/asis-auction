import React, { useEffect, useState } from "react";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

import {
  Button,
  Form,
  OverlayTrigger,
  Spinner,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AutocompleteInput from "../../components/AutocompleteInput";
import SellerLayout from "../../components/Layout/Layout/SellerLayout";
import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
  UploadFailure,
  UploadStart,
  UploadSuccess,
} from "../../features/VehicleSlice.js";

const EditVehicle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { carId } = useParams();
  const { isFetching } = useSelector((state) => state.vehicle);
  const { token } = useSelector((state) => state.auth);
  const [isEdited, setIsEdited] = useState(false);
  const [VehicleType, setVehicleType] = useState("");
  const [formData, setFormData] = useState({
    manufacture_company: "",
    registration_date: "",
    model: "",
    manufacture_year: "",
    unique_identification_number: "",
    color: "",
    fuel_type: "",
    transmission_type: "",
    engine_capacity: "",
    engine_power: "",
    gvm: "",
    axle_configuration: "",
    body_type: "",
    economy: "",
    odometer_reading: "",
    drive_type: "",
    num_of_cylinders: "",
    description: "",
    car_address: "",
    car_city: "",
    car_shuburb: "",
    car_state: "",
    car_postal_code: "",
    is_registered: "",
    expiry_date: "",
  });

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
  const [sameAsSellerAddress, setSameAsSellerAddress] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(GetCarsStart());
      try {
        const { data } = await axios.get(`/api/car/get-car-details/${carId}`, {
          headers: { Authorization: token },
        });
        // console.log(data);
        setVehicleType(data.car.vehicle_type);
        setFormData(data.car);
        dispatch(GetCarsSuccess(data));
      } catch (error) {
        dispatch(GetCarsFailure("hello"));
      }
    };
    fetchDetails();
  }, [carId, token, dispatch]);
  const toCapitalize = (inputString) => {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value; // Use let instead of const for reassignment
    if (name === "manufacture_company") {
      updatedValue = value.toUpperCase();
    }
    if (name === "model" || "color") {
      updatedValue = toCapitalize(value);
    }
    setFormData({ ...formData, [name]: updatedValue });
  };
  const handleSubmit = async (e) => {
    dispatch(UploadStart());
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/car/edit-car-details/${carId}`,
        formData,
        {
          headers: { Authorization: `${token}` },
        }
      );
      dispatch(UploadSuccess(data));
      toast.success("Edited!", successToastOptions);
      setIsEdited(true);
      navigate("/dashboard/user/show-cars")
    } catch (error) {
      dispatch(UploadFailure());
      toast.error(error?.response?.data?.message, ErrorToastOptions);
    }
  };
  const currentYear = new Date().getFullYear();
  const manufacturingYearRange = Array.from(
    { length: currentYear - 2009 },
    (_, index) => currentYear - index
  );
  const handleCheckboxChange = (e) => {};

  const handleAutocompleteSelect = (
    address,
    suburb,
    city,
    state,
    postalCode
  ) => {
    // Set the selected address, state, and postal code in the component state
    setFormData({
      ...formData,
      car_address: address,
      car_shuburb: suburb,
      car_city: city, // Assuming the city is provided as 'city'
      car_state: state, // Assuming the state is provided as 'state'
      car_postal_code: postalCode,
    });
  };
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
    <SellerLayout>
      <h3 className=" ">Edit Vehicle Details</h3>
      <div>
        <ReactPlaceholder
          type="text"
          color="#F0F0F0"
          showLoadingAnimation
          rows={5}
          style={{ width: "80%", textAlign: "left", marginLeft: "10px" }}
          ready={!isFetching}
        >
          <Form onSubmit={handleSubmit} className="seller-upload-form ">
            <div
              style={{
                height: "53vh",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "dark",
                overflow: "-moz-scrollbars-vertical",
                position:"relative"
              }}
            >
              <h4>Step 1</h4>

              <Table className="form-table w-100 text-left" hover borderless>
                <tbody style={{ fontSize: 12 }}>
                  <tr>
                    <td>
                      <Form.Label>
                        Make{" "}
                        {/* <sup className="text-danger font-weight-bold ">*</sup>: */}
                      </Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="manufacture_company"
                        value={formData.manufacture_company}
                        onChange={handleInputChange}
                        placeholder="Manufacturing Company"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Label>Model:</Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        placeholder="Model"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Label>Manufacture Year:</Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="manufacture_year"
                        value={formData.manufacture_year}
                        onChange={handleInputChange}
                        required
                        min={2010}
                        max={currentYear}
                      />
                      {/* {formData.manufacture_year &&
                      (formData.manufacture_year < 2010 ||
                        formData.manufacture_year > currentYear) && (
                        <div className="text-danger">
                          Manufacture year must be between 2010 and{" "}
                          {currentYear}.
                        </div>
                      )} */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Label>VIN Number:</Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="unique_identification_number"
                        value={formData.unique_identification_number}
                        onChange={handleInputChange}
                        placeholder="Unique Identification Number"
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              <h4>Step 2</h4>
              <Table className="form-table w-100 text-left" hover borderless>
                <tbody style={{ fontSize: 12 }}>
                  <tr>
                    <td>
                      <Form.Label>Color:</Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleInputChange}
                        placeholder="Color"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Label>Fuel Type:</Form.Label>
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
                        <option value="PREMIUM UNLEADED">
                          PREMIUM UNLEADED
                        </option>
                        <option value="HYBRID">HYBRID</option>
                        <option value="ELECTRIC">ELECTRIC</option>
                        <option value="OTHER">OTHER</option>
                      </Form.Control>
                    </td>
                  </tr>{" "}
                  <tr>
                    <td>
                      <Form.Label className="font-weight-bold">
                        Body Type
                      </Form.Label>
                    </td>
                    <td>
                      {VehicleType == "Truck" ? (
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
                  {VehicleType == "Truck" ? (
                    <>
                      <tr>
                        <td>
                          <Form.Label>GVM:</Form.Label>
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
                          <Form.Control
                            type="text"
                            name="gvm"
                            value={formData.gvm}
                            onChange={handleInputChange}
                            placeholder="gvm"
                          />
                        </td>
                      </tr>{" "}
                      <tr>
                        <td>
                          <Form.Label className="font-weight-bold">
                            Axle Configuration
                          </Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            as="select"
                            name="axle_configuration"
                            value={formData.axle_configuration}
                            onChange={handleInputChange}
                          >
                            <option value="" disabled>
                              Select an axle configuration
                            </option>
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
                          <Form.Label>
                            Engine Power
                            <sup className="text-danger font-weight-bold">
                              *
                            </sup>
                            :
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
                            type="text"
                            name="engine_power"
                            value={formData.engine_power}
                            onChange={handleInputChange}
                            placeholder="Engine Power"
                          />
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td>
                          <Form.Label>Engine Capacity:</Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="text"
                            name="engine_capacity"
                            value={formData.engine_capacity}
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
                            target: {
                              name: "transmission_type",
                              value: "Automatic",
                            },
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
                            target: {
                              name: "transmission_type",
                              value: "Manual",
                            },
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Label>Odometer Reading:</Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="odometer_reading"
                        value={formData.odometer_reading}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Label>Drive Type:</Form.Label>
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
                  </tr>{" "}
                  <tr>
                    <td>
                      <Form.Label>Number of Cylinders:</Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        name="num_of_cylinders"
                        value={formData.num_of_cylinders}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>{" "}
                </tbody>
              </Table>
              <h4>Step 3</h4>
              <Table className="form-table w-100 text-left" hover borderless>
                <tbody style={{ fontSize: 12 }}>
                  <tr>
                    <td>
                      <Form.Label>Same as Seller Location:</Form.Label>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="sameAsSeller"
                        checked="{sameAsSellerAddress}"
                        onchange="{handleCheckboxChange}"
                        className="checkbutton"
                      />
                    </td>
                  </tr>
                  {!sameAsSellerAddress && (
                    <>
                      <tr>
                        <td>
                          <Form.Label>Complete Address:</Form.Label>
                        </td>
                        <td>
                          {/* Use AutocompleteInput component for Car Location Street */}
                          <AutocompleteInput
                            value={formData.car_address}
                            onChange={(newAddress) =>
                              handleInputChange("car_address", newAddress)
                            }
                            onSelect={handleAutocompleteSelect}
                            placeholder="Search Address ..."
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label>State:</Form.Label>
                        </td>
                        <td>
                          {/* Use AutocompleteInput component for Car Location Street */}
                          <Form.Control
                            type="text"
                            name="car_state"
                            value={formData.car_state}
                            onChange={(newAddress) =>
                              handleInputChange("car_state", newAddress)
                            }
                            placeholder="State ..."
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label>Suburb:</Form.Label>
                        </td>
                        <td>
                          {/* Use AutocompleteInput component for Car Location City */}
                          <Form.Control
                            type="text"
                            name="car_shuburb"
                            value={formData.car_shuburb}
                            onChange={(newAddress) =>
                              handleInputChange("car_shuburb", newAddress)
                            }
                            placeholder="Suburb ..."
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label>City/Town:</Form.Label>
                        </td>
                        <td>
                          {/* Use AutocompleteInput component for Car Location City */}

                          <Form.Control
                            type="text"
                            name="car_city"
                            value={formData.car_city}
                            onChange={(newAddress) =>
                              handleInputChange("car_city", newAddress)
                            }
                            placeholder="City/Town ..."
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Form.Label>Postcode:</Form.Label>
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            name="car_postal_code"
                            value={formData.car_postal_code}
                            onChange={handleInputChange}
                            disabled
                          />
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </Table>

              <h4>Step 4</h4>
              <Table className="form-table w-100 text-left" hover borderless>
                <tbody style={{ fontSize: 12 }}>
                  <tr>
                    <td>
                      <Form.Label>Description:</Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        as="textarea"
                        rows={10}
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            {isFetching ? (
              <Button variant="dark" size="lg" disabled>
                <Spinner animation="border" variant="light" />
              </Button>
            ) : (
              <button className="advanced-button" type="submit">
                Edit
              </button>
            )}
          </Form>
        </ReactPlaceholder>
      </div>
    </SellerLayout>
  );
};

export default EditVehicle;
