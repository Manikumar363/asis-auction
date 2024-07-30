import React, { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import AutocompleteInput from "../../../components/AutocompleteInput";

const Step3 = ({ formData, setFormData, prevStep, nextStep }) => {

 
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const { userAddress, userSuburb, userCity, userState, userPostalCode } =
    useSelector((state) => state.auth);
  const [sameAsSellerAddress, setSameAsSellerAddress] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target ? e.target.value : e;
    const name = e.target ? e.target.name : "undefinedName"; // Provide a default name if not available

    setFormData({ ...formData, [name]: value });
  };

 

  const handleCheckboxChange = (e) => {
    setSameAsSellerAddress(e.target.checked);
    if (e.target.checked) {
      // If checked, copy seller's address to car location
      setFormData({
        ...formData,
        car_address: userAddress,
        car_suburb: userSuburb,
        car_city: userCity,
        car_state: userState,
        car_postal_code: userPostalCode,
      });
    } else {
      setFormData({
        ...formData,
        car_address: "",
        car_suburb: "",
        car_city: "",
        car_state: "",
        car_postal_code: "",
      });
    }
  };
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
      car_suburb: suburb,
      car_state: state,
      car_city: city, // Assuming the state is the city
      car_postal_code: postalCode,
    });
  };
  const isFormComplete = () => {
    return (
      (sameAsSellerAddress || formData.car_address) &&
      (sameAsSellerAddress || formData.car_suburb) &&
      (sameAsSellerAddress || formData.car_city) &&
      (sameAsSellerAddress || formData.car_state) &&
      (sameAsSellerAddress || formData.car_postal_code)
    );
  };
  return (
    <div>
      <h4>Step 3: Address</h4>
      <hr />
      <div className="seller-upload-form">
        <table className="form-table">
          <tbody>
            <tr>
              <td colSpan="2" className="text-center">
                <h4>Vehicle Location Address</h4>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>Same as Seller Location:</Form.Label>
              </td>
              <td>
                <input
                  type="checkbox"
                  name="sameAsSeller"
                  checked={sameAsSellerAddress}
                  onChange={handleCheckboxChange}
                />
              </td>
            </tr>
            {!sameAsSellerAddress && (
              <>
                <tr>
                  <td>
                    <Form.Label className="font-weight-bold">
                      Complete Address{" "}
                      <sup className="text-danger font-weight-bold">*</sup>:
                    </Form.Label>
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
                    <Form.Label className="font-weight-bold">
                      Suburb{" "}
                      <sup className="text-danger font-weight-bold">*</sup>:
                    </Form.Label>
                  </td>
                  <td>
                    {/* Use AutocompleteInput component for Car Location City */}
                    <Form.Control
                      type="text"
                      name="car_suburb"
                      value={formData.car_suburb}
                      onChange={(newAddress) =>
                        handleInputChange("car_suburb", newAddress)
                      }
                      placeholder="Suburb ..."
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="font-weight-bold">
                      City/Town{" "}
                      <sup className="text-danger font-weight-bold">*</sup>:
                    </Form.Label>
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
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="font-weight-bold">
                      State{" "}
                      <sup className="text-danger font-weight-bold">*</sup>:
                    </Form.Label>
                  </td>
                  <td>
                    {/* Use AutocompleteInput component for Car Location City */}
                    <Form.Control
                      type="text"
                      name="car_state"
                      value={formData.car_state}
                      onChange={(newAddress) =>
                        handleInputChange("car_state", newAddress)
                      }
                      placeholder="State ..."
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Label className="font-weight-bold">
                      Postcode{" "}
                      <sup className="text-danger font-weight-bold">*</sup>:
                    </Form.Label>
                  </td>
                  <td>
                    <Form.Control
                      type="number"
                      name="car_postal_code"
                      value={formData.car_postal_code}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </>
            )}
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
          disabled={!isFormComplete()}
        >
          {" "}
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
