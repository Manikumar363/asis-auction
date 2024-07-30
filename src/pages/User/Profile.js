import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import AutocompleteInput from "../../components/AutocompleteInput";
import DashboardHeader from "../../components/Layout/DashboardHeader";
import Layout from "../../components/Layout/Layout/Layout";
import UserMenu from "../../components/Menu/UserMenu";
import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
} from "../../features/VehicleSlice";
import { setProfile } from "../../features/authSlice";
import axios from "../../utils/axios.js";
import { parseError } from "../../utils/parseError";
import PageNotFound from "../PageNotFound";
const ErrorToastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const Profile = () => {
  const [fetchError, setFetchError] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    suburb: "",
    city: "",
    state: "",
    postal_code: "",
    phoneNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    licenceNumber: "",
    licenceState: "",
    cardNumberBack: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fetchDetails = async () => {
    dispatch(GetCarsStart());
    try {
      const { data } = await axios.get("/api/user/myprofile", {
        headers: { Authorization: token },
      });
      const user = data?.user;
      setValues({
        name: user?.name,
        email: user?.email,
        age: user?.age,
        address: user?.address,
        phoneNumber: user?.phone,
        suburb: user?.shuburb,
        city: user?.city,
        state: user?.state,
        postal_code: user?.postal_code,
        firstName: user?.firstname,
        middleName: user?.middlename,
        lastName: user?.lastname,
        dob: user?.dob,
        cardNumberBack: user?.card_details?.cardnumberback,
        licenceNumber: user?.card_details?.licencenumber,
        licenceState: user?.card_details?.licence_state,
      });
      GetCarsSuccess(data);
    } catch (error) {
      setFetchError(true);
      GetCarsFailure();
    }
  };

  const updateProfile = async () => {
    try {
      const {
        name,
        email,
        age,
        phoneNumber,
        address,
        city,
        suburb,
        state,
        postal_code,
        firstName,
        middleName,
        lastName,
        dob,
        licenceNumber,
        licenceState,
        cardNumberBack,
      } = values;
      setLoading(true);
      await axios.put(
        "/api/user/update-profile",
        {
          name,
          email,
          age,
          phoneNumber,
          address,
          city,
          suburb,
          state,
          postal_code,
          firstName,
          middleName,
          lastName,
          dob,
          licenceNumber,
          licenceState,
          cardNumberBack,
        },
        { headers: { Authorization: `${token}` } }
      );
      dispatch(
        setProfile({
          name,
          email,
          age,
          phoneNumber,
          address,
          city,
          suburb,
          state,
          postal_code,
          firstName,
          middleName,
          lastName,
          dob,
          licenceNumber,
          licenceState,
          cardNumberBack,
        })
      );
      setLoading(false);

      toast.success("Details updated!", toastOptions);
    } catch (error) {
      const errorMessage = parseError(error);
      toast.error(errorMessage, toastOptions);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProfile();

    await fetchDetails();
    setEditMode(false);
  };

  //edit form from icon
  const [editMode, setEditMode] = useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleAutocompleteSelect = (
    address,
    suburb,
    city,
    state,
    postalCode
  ) => {
    // Set the selected address, state, and postal code in the component state
    setValues({
      ...values,
      address: address,
      suburb: suburb,
      city: city, // Assuming the city is provided as 'city'
      state: state, // Assuming the state is provided as 'state'
      postal_code: postalCode,
    });
  };
  return (
    <Layout>
      {fetchError ? (
        <PageNotFound />
      ) : (
        <Container className="admin-dashboard">
          <DashboardHeader />
          <div className="account-container row">
            <Col md={3}>
              <UserMenu />
            </Col>
            <Col md={9} className="admin-details">
              <h3 className=" ">User Details</h3>
              <div className="card ">
                <Form onSubmit={handleSubmit} className="profile-form">
                  <ReactPlaceholder
                    type="text"
                    color="#F0F0F0"
                    showLoadingAnimation
                    rows={5}
                    style={{ width: "80%" }}
                    ready={!loading}
                  >
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="firstName">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={values?.firstName}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="middleName">
                          <Form.Label>Middle Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="middleName"
                            value={values?.middleName}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </Form.Group>
                      </Col>{" "}
                      <Col md={3}>
                        <Form.Group className="mb-3" controlId="lastName">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={values?.lastName}
                            onChange={handleChange}
                            disabled={!editMode}
                          />{" "}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="cardNumber">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardNumberBack"
                            value={values?.cardNumberBack}
                            onChange={handleChange}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        {" "}
                        <Form.Group className="mb-3" controlId="phoneNumber">
                          <Form.Label>Mobile No.</Form.Label>
                          <Form.Control
                            type="number"
                            required
                            name="phoneNumber"
                            value={values?.phoneNumber}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="email">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            required
                            value={values?.email}
                            name="email"
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="dob">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control
                            type="date"
                            required
                            name="dob"
                            value={values?.dob}
                            onChange={handleChange}
                            disabled={!editMode}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <Form.Group controlId="Address">
                          <Form.Label>Address</Form.Label>
                          <div className="w-100">
                            {editMode ? (
                              <AutocompleteInput
                                className="autocomplete-address"
                                type="text"
                                value={values.address}
                                onChange={handleChange}
                                onSelect={handleAutocompleteSelect}
                                placeholder="Search Address ..."
                              />
                            ) : (
                              <Form.Control
                                className="autocomplete-address"
                                as="textarea"
                                value={values.address}
                                onChange={handleChange}
                                placeholder="Search Address ..."
                                disabled
                              />
                            )}
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="city">
                          <Form.Label>Town/City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            value={values?.city}
                            onChange={handleChange}
                            placeholder="City/Town ..."
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="state">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            type="text"
                            name="state"
                            value={values?.state}
                            onChange={handleChange}
                            placeholder="State ..."
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="city">
                          <Form.Label>Suburb</Form.Label>
                          <Form.Control
                            type="text"
                            name="suburb"
                            value={values?.suburb}
                            onChange={handleChange}
                            placeholder="Suburb ..."
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="postal_code">
                          <Form.Label>PostalCode.</Form.Label>
                          <Form.Control
                            type="text"
                            name="postal_code"
                            value={values.postal_code}
                            onChange={handleChange}
                            placeholder="Postal code/Zip code ..."
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {/* Additional Fields */}
                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="licenceNumber">
                          <Form.Label>License Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="licenceNumber"
                            value={values?.licenceNumber}
                            onChange={handleChange}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="licenceState">
                          <Form.Label>License State</Form.Label>
                          <Form.Control
                            type="text"
                            name="licenceState"
                            value={values?.licenceState}
                            onChange={handleChange}
                            disabled
                          />
                        </Form.Group>
                      </Col>
                    </Row>{" "}
                    <Row className="mb-3"></Row>
                    {/* ... Add other additional fields similarly */}
                    {editMode && (
                      <div className="form-sub-sec">
                        <button type="submit" className="advanced-button">
                          Update
                        </button>
                      </div>
                    )}
                  </ReactPlaceholder>
                  <div className=" Edit-box text-end" onClick={handleEditClick}>
                    <span className="mr-1 ">Update</span>
                    <i className="fas fa-edit "></i>
                  </div>
                </Form>
              </div>
            </Col>
          </div>
        </Container>
      )}
    </Layout>
  );
};

export default Profile;
