// import { format } from "date-fns";
// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Col,
//   Container,
//   Form,
//   InputGroup,
//   Row,
//   Spinner,
// } from "react-bootstrap";

// import FloatingLabel from "react-bootstrap/FloatingLabel";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import AutocompleteInput from "../../components/AutocompleteInput.js";
// import Layout from "../../components/Layout/Layout/Layout";
// import { getOtp, register, verifyOtp } from "../../features/apiCall";

// const Signup = () => {
//   const [selectedState, setSelectedState] = useState(""); // State to store selected state
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [passwordLength, setPasswordLength] = useState(0);
//   const [phoneNumberLength, setPhoneNumberLength] = useState(0);
//   const [AgeError, setAgeError] = useState("");
//   const [cardError, setCardError] = useState("");
//   const [PasswordError, setPasswordError] = useState("");
//   const [phoneNumberError, setPhoneNumberError] = useState("");
//   const [signup, setSignUp] = useState(true);
//   const [docs, setDocs] = useState("Driver License");
//   const [showDocs, setShowDocs] = useState(false);
//   const [otpcheck, setOtpcheck] = useState(false);

//   const docplaceholder = `Enter ${docs} number`;
//   const australianStates = [
//     "NSW",
//     "VIC",
//     "QLD",
//     "SA",
//     "WA",
//     "TAS",
//     "NT",
//     "ACT",
//   ];
//   const handleDocs = (e) => {
//     const { value, name } = e.target;

//     setShowDocs(true);
//     setDocs(e.target.value);
//   };
//   const handleStateSelect = (event) => {
//     setSelectedState(event.target.value);
//     setValues({ ...values, licenceState: event.target.value }); // Assuming licenceState corresponds to the selected state
//   };
//   const [values, setValues] = useState({
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     dob: "",
//     licenceState: "",
//     licenceNumber: "",
//     cardNumberBack: "",
//     email: "",
//     password: "",
//     age: "",
//     phoneNumber: "",
//     address: "",
//     city: "",
//     state: "",
//     postal_code: "",
//     suburb: "",
//     otp: "",
//     document: "",
//     passportnumber: "", // State to store OTP
//   });
//   const [selectedOption, setSelectedOption] = useState("seller");
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [isMobileVerified, setIsMobileVerified] = useState(false);
//   const { isFetching, errMsg, error, token } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // toast options
//   const ErrorToastOptions = {
//     position: "bottom-center",
//     autoClose: 3000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "dark",
//   };
//   const SuccessToastOptions = {
//     position: "bottom-center",
//     autoClose: 3000,
//     pauseOnHover: true,
//     draggable: true,
//     theme: "light",
//   };

//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.id);
//     setDocs(event.target.value);
//   };

//   const createOtpReq = async () => {
//     if (values.phoneNumber.length != 10) {
//       toast.error("Invalid Phone number", ErrorToastOptions);
//       return;
//     }

//     const res = await getOtp(values.phoneNumber);
//     if (res) {
//       toast.success("Otp sent", SuccessToastOptions);
//       setIsMobileVerified(true);
//     } else {
//       toast.error("Invalid Phone number", ErrorToastOptions);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     const phone = values.phoneNumber;
//     const code = values.otp;

//     const res = await verifyOtp(phone, code);

//     if (res) {
//       setOtpcheck(res);
//       toast.success("OTP Verified", SuccessToastOptions);
//     } else {
//       toast.error("OTP not verified", ErrorToastOptions);
//     }
//   };

//   const handleChange = (e) => {
//     var { name, value } = e.target;
//     if (name === "document") {
//       setShowDocs(true);
//       if (value === "driverslicence") {
//         setDocs("Driver License");
//       } else {
//         setDocs(value);
//       }
//     }
//     if (name == "document" || value == "visa") {
//       value = "passport";
//     }

//     setValues({ ...values, [name]: value });
//     if (name === "dob") {
//       const formattedDate = format(new Date(value), "dd/MM/yyyy");
//       setValues({ ...values, [name]: formattedDate });
//     } else {
//       setValues({ ...values, [name]: value });
//     }
//     if (name === "cardNumberBack") {
//       const isValidCardNumber = /^[a-zA-Z0-9]+$/.test(value);
//       if (!isValidCardNumber) {
//         setCardError("Card Number should only contain alphabets and numbers");
//       } else {
//         setCardError("");
//       }
//     }
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     if (token) {
//       navigate("/");
//     }
//   }, [navigate, token, error, isFetching]);

//   const handleTogglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const {
//       firstName,
//       middleName,
//       lastName,
//       email,
//       password,
//       dob,
//       phoneNumber,
//       address,
//       city,
//       state,
//       postal_code,
//       suburb,
//       licenceNumber,
//       licenceState,
//       cardNumberBack,

//       otp,
//       passportnumber,
//       // Include OTP in form submission
//     } = values;
//     var { document } = values;
//     console.log(document);
//     // Validate OTP
//     if (!isMobileVerified) {
//       // Show error or handle non-verified state
//       return;
//     }

//     if (document === "") {
//       document = "driverlicense";
//     }
//     if (!otpcheck) {
//       toast.error("Invalid OTP", ErrorToastOptions);
//       return;
//     } else {
//       register(dispatch, {
//         firstName,
//         middleName,
//         lastName,
//         email,
//         password,
//         dob,
//         phoneNumber,
//         address,
//         city,
//         state,
//         postal_code,
//         suburb,
//         licenceNumber,
//         licenceState,
//         cardNumberBack,
//         otp,
//         document,
//         passportnumber,
//         // Pass OTP to the registration API call
//       });
//       setIsRegistered(true);
//     }
//     // Validate password length
//   };

//   // Function to handle mobile verification
//   const handleMobileVerification = () => {
//     if (values.phoneNumber.length == 10) {
//       setIsMobileVerified(true);
//       try {
//         // await sendMobileOtp (dispatch,(mobileno))
//       } catch (error) {}
//     } else {
//       toast.error("Please enter mobile number", ErrorToastOptions);
//     }
//   };

//   useEffect(() => {
//     if (isRegistered && !isFetching && !error) {
//       setIsRegistered(false);
//       navigate("/"); // Redirect to the homepage after successful registration
//     }
//     if (error && !isFetching && isRegistered) {
//       // toast.error(errMsg, ErrorToastOptions);
//       setIsRegistered(false);
//     }
//   }, [isRegistered, isFetching, error, errMsg, navigate]);

//   const handleAutocompleteSelect = (
//     address,
//     suburb,
//     city,
//     state,
//     postalCode
//   ) => {
//     // Set the selected address, state,and postal code in the component state
//     setValues({
//       ...values,
//       address: address,
//       suburb: suburb,
//       city: city,
//       state: state,
//       postal_code: postalCode,
//     });
//   };

//   return (
//     <Layout>
//       <section className="Signup-container">
//         <div className="form-image"></div>
//         <div className="heading-section form-container">
//           <h2>SIGNUP ACCOUNT</h2>
//           <Form id="Signup-form" onSubmit={handleSubmit}>
//             <Container>
//               {/* Your existing form fields */}
//               <Row>
//                 <Col>
//                   {" "}
//                   <InputGroup className="I-input ">
//                     <i className="fa fa-user " />

//                     <Form.Control
//                       type="text"
//                       name="firstName"
//                       placeholder="First Name"
//                       onChange={handleChange}
//                       required
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col>
//                   <InputGroup className="I-input ">
//                     <Form.Control
//                       type="text"
//                       name="middleName"
//                       placeholder="Middle Name"
//                       onChange={handleChange}
//                     />
//                   </InputGroup>
//                 </Col>
//                 <Col>
//                   <InputGroup className="I-input ">
//                     <Form.Control
//                       type="text"
//                       name="lastName"
//                       placeholder="Last Name"
//                       onChange={handleChange}
//                       required
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   {" "}
//                   <InputGroup className="I-input ">
//                     <i className="fa fa-envelope" />

//                     <Form.Control
//                       type="email"
//                       name="email"
//                       placeholder="Enter email"
//                       onChange={handleChange}
//                       required
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col>
//                   {" "}
//                   <InputGroup className="I-input ">
//                     <i className="fa fa-globe" />
//                     <div className="w-100">
//                       <AutocompleteInput
//                         className="autocomplete-address"
//                         type="text"
//                         value={values.address}
//                         onChange={handleChange}
//                         onSelect={handleAutocompleteSelect}
//                         placeholder="Search Address ..."
//                         required
//                       />
//                     </div>
//                   </InputGroup>
//                 </Col>
//
//               </Row>
//               <Row>
//                 <Col>
//                   <InputGroup className="I-input ">
//                     <i className="fa fa-map-marker" />
//                     <Form.Control
//                       type="text"
//                       nane="state"
//                       value={values.state}
//                       onChange={handleChange}
//                       placeholder="State ..."
//                       required
//                     />
//                   </InputGroup>
//                 </Col>

//                 <Col>
//                   <InputGroup className="I-input ">
//                     <i className="fa-solid fa-city" />
//                     <Form.Control
//                       type="text"
//                       nane="city"
//                       value={values.city}
//                       onChange={handleChange}
//                       placeholder="City/Town ..."
//                       required
//                     />{" "}
//                   </InputGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   {" "}
//                   <InputGroup className="I-input ">
//                     <i class="fa fa-bars" aria-hidden="true" />
//                     <Form.Control
//                       type="text"
//                       nane="suburb"
//                       value={values.suburb}
//                       onChange={handleChange}
//                       placeholder="Suburb ..."
//                       required
//                     />{" "}
//                   </InputGroup>
//                 </Col>

//                 <Col>
//                   {" "}
//                   <InputGroup className="I-input ">
//                     <i className="fa fa-map-pin" />
//                     <Form.Control
//                       type="text"
//                       name="postal_code"
//                       value={values.postal_code}
//                       onChange={handleChange}
//                       placeholder="Postal code/Zip code ..."
//                       required
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <InputGroup className="I-input ">
//                     <i className="fa fa-lock" />

//                     <Form.Control
//                       type={passwordVisible ? "text" : "password"}
//                       name="password"
//                       placeholder="Password"
//                       onChange={handleChange}
//                       className={PasswordError ? "is-invalid" : ""}
//                       required
//                     />

//                     <NavLink
//                       className="password-eye"
//                       onClick={handleTogglePasswordVisibility}
//                     >
//                       {passwordVisible ? (
//                         <i className="fa fa-eye-slash " />
//                       ) : (
//                         <i className="fa-solid fa-eye" />
//                       )}
//                     </NavLink>
//                     <div className="invalid-feedback">{PasswordError}</div>
//                   </InputGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col sm={6}>
//                   <InputGroup className="I-input ">
//                     <Form.Control
//                       type="date"
//                       name="dob"
//                       placeholder="Date of Birth"
//                       onChange={handleChange}
//                       required
//                     />
//                   </InputGroup>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <InputGroup className="I-input ">
//                     <Form.Control
//                       type="number"
//                       name="phoneNumber"
//                       placeholder="Phone Number"
//                       onChange={handleChange}
//                       required
//                     />
//                     {isMobileVerified ? null : (
//                       <Button onClick={createOtpReq}>Verify Mobile</Button>
//                     )}
//                     {/* Show OTP input fields dynamically */}
//                   </InputGroup>
//                   {isMobileVerified && (
//                     <>
//                       <InputGroup className="I-input  d-flex">
//                         <Form.Control
//                           type="number"
//                           name="otp"
//                           placeholder="Enter OTP"
//                           onChange={handleChange}
//                           required
//                         />
//                         <Button onClick={handleVerifyOTP}>Verify OTP</Button>
//                       </InputGroup>
//                     </>
//                   )}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <InputGroup className="I-input ">
//                     <FloatingLabel
//                       controlId="floatingSelectGrid"
//                       label="Verification document type"
//                       style={{ fontSize: "12px" }}
//                     >
//                       <Form.Select
//                         style={{
//                           fontSize: "12px",
//                           fontWeight: "400",
//                           fontFamily: "Work Sans, sans-serif",
//                           color: "#797D7E",
//                         }}
//                         onChange={handleChange}
//                         name="document"
//                       >
//                         <option disabled>Select Document</option>
//                         <option value="driverslicence">Drivers Licence</option>
//                         <option value="passport">Passport</option>
//                         <option value="visa">Visa</option>
//                       </Form.Select>
//                     </FloatingLabel>

//                     {/* Show OTP input fields dynamically */}
//                   </InputGroup>
//                 </Col>
//               </Row>
//               <Row></Row>
//               <Row>
//                 <Col sm={12}>
//                   {docs == "Driver License" || docs == "" ? (
//                     <FloatingLabel
//                       controlId="floatingInputGrid"
//                       label={docplaceholder}
//                     >
//                       <Form.Control
//                         type="text"
//                         name="licencenumber"
//                         placeholder={docplaceholder}
//                         onChange={handleChange}
//                         maxLength={8} // Limit license number to 8 digits
//                         required
//                         style={{ paddingLeft: 6 }}
//                       />
//                     </FloatingLabel>
//                   ) : (
//                     <FloatingLabel
//                       controlId="floatingInputGrid"
//                       label={docplaceholder}
//                     >
//                       <Form.Control
//                         type="text"
//                         name="passportnumber"
//                         placeholder={docplaceholder}
//                         onChange={handleChange}
//                         maxLength={9} // Limit license number to 8 digits
//                         required
//                         style={{ paddingLeft: 6 }}
//                       />
//                     </FloatingLabel>
//                   )}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col sm={6}>
//                   <InputGroup className="I-input ">
//                     <FloatingLabel
//                       controlId="floatingSelectGrid"
//                       label="State of Vehicle Registration"
//                       style={{ fontSize: "12px" }}
//                     >
//                       <Form.Select
//                         className="form-control"
//                         value={selectedState}
//                         onChange={handleStateSelect}
//                         style={{
//                           fontSize: "12px",
//                           fontWeight: "400",
//                           fontFamily: "Work Sans, sans-serif",
//                           color: "#797D7E",
//                         }}
//                       >
//                         <option value="">Select State</option>
//                         {australianStates.map((state, index) => (
//                           <option key={index} value={state}>
//                             {state}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     </FloatingLabel>
//                   </InputGroup>
//                 </Col>
//               </Row>

//               {/* Card Number Back */}
//               <Row>
//                 <Col>
//                   <InputGroup className="I-input ">
//                     <FloatingLabel
//                       controlId="floatingInputGrid"
//                       label="Enter Card Number"
//                     >
//                       <Form.Control
//                         type="text"
//                         name="cardnumberback"
//                         placeholder="Card Number"
//                         onChange={handleChange}
//                         required
//                         style={{ paddingLeft: 6 }}
//                       />
//                     </FloatingLabel>
//                     <div className="invalid-feedback">{cardError}</div>
//                   </InputGroup>
//                 </Col>
//               </Row>

//               {/* Submit Button */}
//               {isFetching ? (
//                 <Button variant="dark" size="lg" disabled>
//                   <Spinner animation="border" variant="light" />
//                 </Button>
//               ) : (
//                 <button
//                   className="advanced-button"
//                   type="submit"
//                   disabled={!otpcheck}
//                 >
//                   Sign Up
//                 </button>
//               )}
//             </Container>
//           </Form>
//           <div className="login-link mt-3">
//             <p>
//               Already have an account?{" "}
//               <NavLink
//                 to="/login"
//                 className="text-decoration-none text-muted font-weight-bold"
//               >
//                 Login here
//               </NavLink>
//             </p>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Signup;
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AutocompleteInput from "../../components/AutocompleteInput.js";
import Layout from "../../components/Layout/Layout/Layout";
import { getOtp, register, verifyOtp } from "../../features/apiCall";
// import '.././././../styles/signup.css'
import { OverlayTrigger,  Tooltip } from "react-bootstrap";

const Signup = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0);
  const [phoneNumberLength, setPhoneNumberLength] = useState(0);
  const [AgeError, setAgeError] = useState("");
  const [cardError, setCardError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [signup, setSignUp] = useState(true);
  const [docs, setDocs] = useState("Driver License");
  const [showDocs, setShowDocs] = useState(false);
  const [otpcheck, setOtpcheck] = useState(false);

  const docplaceholder = `Enter ${docs} number`;
  const australianStates = [
    "NSW",
    "VIC",
    "QLD",
    "SA",
    "WA",
    "TAS",
    "NT",
    "ACT",
  ];
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo (Congo-Brazzaville)",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czechia (Czech Republic)",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini (fmr. Swaziland)",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar (formerly Burma)",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia (formerly Macedonia)",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine State",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City (Holy See)",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handleStateSelect = (event) => {
    setSelectedState(event.target.value);
    setValues({ ...values, licenceState: event.target.value });
  };
  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value);
    setValues({ ...values, country: event.target.value });
  };

  const [values, setValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    rawDob: "",
    licenceState: "",
    licenceNumber: "",
    cardNumberBack: "",
    email: "",
    password: "",
    age: 0,
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    suburb: "",
    otp: "",
    document: "",
    passportnumber: "",
    country: "",
  });

  const [selectedOption, setSelectedOption] = useState("seller");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const { isFetching, errMsg, error, token } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ErrorToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const SuccessToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
    setDocs(event.target.value);
  };

  const createOtpReq = async () => {
    if (values.phoneNumber.length !== 10) {
      toast.error("Invalid Phone number", ErrorToastOptions);
      return;
    }

    const res = await getOtp(values.phoneNumber);
    if (res) {
      toast.success("Otp sent", SuccessToastOptions);
      setIsMobileVerified(true);
    } else {
      toast.error("Invalid Phone number", ErrorToastOptions);
    }
  };

  const handleVerifyOTP = async () => {
    const phone = values.phoneNumber;
    const code = values.otp;

    const res = await verifyOtp(phone, code);

    if (res) {
      setOtpcheck(res);
      toast.success("OTP Verified", SuccessToastOptions);
    } else {
      toast.error("OTP not verified", ErrorToastOptions);
    }
  };

  const handleChange = (e) => {
    var { name, value } = e.target;
    if (name === "document") {
      setShowDocs(true);
      if (value === "driverslicence") {
        setDocs("Driver License");
      } else {
        setDocs(value);
      }
    }
    // if (name === "document" || value === "visa") {
    //   value = "passport";
    // }

    setValues({ ...values, [name]: value });
    if (name === "dob") {
      const formattedDate = format(new Date(value), "dd/MM/yyyy");
      setValues({ ...values, [name]: formattedDate, rawDob: value });
    } else {
      setValues({ ...values, [name]: value });
    }
    if (name === "cardNumberBack") {
      const isValidCardNumber = /^[a-zA-Z0-9]+$/.test(value);
      if (!isValidCardNumber) {
        setCardError("Card Number should only contain alphabets and numbers");
      } else {
        setCardError("");
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      navigate("/");
    }
  }, [navigate, token, error, isFetching]);

  const handleTogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      dob,
      rawDob,
      phoneNumber,
      address,
      city,
      state,
      postal_code,
      suburb,
      licenceNumber,
      licenceState,
      cardNumberBack,
      age,
      otp,
      passportnumber,
      country
    } = values;
    alert(JSON.stringify(values));

    var { document } = values;

    const today = new Date().toISOString().split("T")[0];

    if (rawDob > today) {
      toast.error("Date of Birth cannot be in the future.", ErrorToastOptions);
      return;
    }

    if (!isMobileVerified) {
      toast.error("Mobile number not verified", ErrorToastOptions);
      return;
    }

    if (document === "") {
      toast.error("Document is empty", ErrorToastOptions);
      document = "driverslicense";
    }
    if (!otpcheck) {
      toast.error("Invalid OTP", ErrorToastOptions);
      return;
    } else {
      register(dispatch, {
        firstName,
        middleName,
        lastName,
        email,
        password,
        dob,
        phoneNumber,
        address,
        city,
        age,
        state,
        postal_code,
        suburb,
        licenceNumber,
        licenceState,
        cardNumberBack,
        otp,
        document,
        passportnumber,
      });
      setIsRegistered(true);
    }
  };

  const handleMobileVerification = () => {
    if (values.phoneNumber.length === 10) {
      setIsMobileVerified(true);
    } else {
      toast.error("Please enter mobile number", ErrorToastOptions);
    }
  };

  useEffect(() => {
    if (isRegistered && !isFetching && !error) {
      setIsRegistered(false);
      navigate("/");
    }
    if (error && !isFetching && isRegistered) {
      setIsRegistered(false);
    }
  }, [isRegistered, isFetching, error, errMsg, navigate]);

  const handleAutocompleteSelect = (
    address,
    suburb,
    city,
    state,
    postalCode
  ) => {
    setValues({
      ...values,
      address: address,
      suburb: suburb,
      city: city,
      state: state,
      postal_code: postalCode,
    });
  };

  return (
    <Layout>
      <section className="Signup-container">
        <div className="form-image"></div>
        <div className="heading-section form-container">
          <h2>SIGNUP ACCOUNT</h2>
          <Form id="Signup-form" onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col>
                  <InputGroup className="I-input">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="First Name *"
                    >
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <InputGroup className="I-input ">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Middle Name "
                    >
                      <Form.Control
                        type="text"
                        name="middleName"
                        placeholder="Middle Name *"
                        onChange={handleChange}
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup className="I-input ">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Last Name *"
                    >
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="I-input ">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Email *"
                    >
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email *"
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  <InputGroup className="I-input ">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      // label="Search Address... *"
                    >
                      <div className="w-100">
                        <AutocompleteInput
                          className="autocomplete-address"
                          type="text"
                          value={values.address}
                          onChange={handleChange}
                          onSelect={handleAutocompleteSelect}
                          placeholder=""
                          required
                        />
                      </div>
                    </FloatingLabel>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="I-input ">
                    <FloatingLabel controlId="floatingInputGrid" label="State ">
                      <Form.Control
                        type="text"
                        name="state *"
                        value={values.state}
                        onChange={handleChange}
                        placeholder="State ..."
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>

                <Col>
                  <InputGroup className="I-input ">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="City/Town"
                    >
                      <Form.Control
                        type="text"
                        name="city *"
                        value={values.city}
                        onChange={handleChange}
                        placeholder="City/Town ..."
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="I-input ">
                    <FloatingLabel controlId="floatingInputGrid" label="Suburb">
                      <Form.Control
                        type="text"
                        name="suburb *"
                        value={values.suburb}
                        onChange={handleChange}
                        placeholder="Suburb ..."
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>

                <Col>
                  <InputGroup className="I-input ">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Postal code"
                    >
                      <Form.Control
                        type="text"
                        name="postal_code *"
                        value={values.postal_code}
                        onChange={handleChange}
                        placeholder="Postal code/Zip code ..."
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup
                    className="I-input "
                    style={{ postion: "relative" }}
                  >
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Password *"
                    >
                      <Form.Control
                        type={passwordVisible ? "text" : "password"}
                        name="password"
                        placeholder="Password *"
                        onChange={handleChange}
                        className={PasswordError ? "is-invalid" : ""}
                        required
                      />

                      <div
                        style={{
                          width: "fit-content",
                          position: "absolute",
                          right: "30px",
                          top: "10px",
                        }}
                        onClick={handleTogglePasswordVisibility}
                      >
                        {passwordVisible ? (
                          <i className="fa fa-eye-slash" />
                        ) : (
                          <i className="fa fa-eye" />
                        )}
                      </div>

                      <div className="invalid-feedback">{PasswordError}</div>
                    </FloatingLabel>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={6} md={12}>
                  <InputGroup className="I-input ">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label="Date of Birth *"
                    >
                      <Form.Control
                        type="date"
                        name="dob"
                        placeholder="Date of Birth *"
                        onChange={handleChange}
                        required
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="I-input mb-3 ">
                    <Form.Control
                      type="number"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      onChange={handleChange}
                      required
                    />
                    {isMobileVerified ? null : (
                      <Button onClick={createOtpReq}>Verify Mobile</Button>
                    )}
                    {/* Show OTP input fields dynamically */}
                  </InputGroup>
                  {isMobileVerified && (
                    <>
                      <InputGroup className="I-input  d-flex">
                        <Form.Control
                          type="number"
                          name="otp"
                          placeholder="Enter OTP"
                          onChange={handleChange}
                          required
                        />
                        <Button onClick={handleVerifyOTP}>Verify OTP</Button>
                      </InputGroup>
                    </>
                  )}
                </Col>
              </Row>
              <Row>
                <Col>
                  <InputGroup className="I-input mb-3">
                    <FloatingLabel
                      controlId="floatingSelectGrid"
                      label="Verification document type *"
                    >
                      <Form.Select
                        onChange={handleChange}
                        name="document"
                        required
                      >
                        <option disabled>Select Document</option>
                        <option name="document" value="driverslicence">
                          Drivers Licence
                        </option>
                        <option name="document" value="passport">
                          Passport
                        </option>
                        <option name="document" value="visa">
                          Visa
                        </option>
                      </Form.Select>
                    </FloatingLabel>
                  </InputGroup>
                </Col>
                <Col sm={6}>
                  <InputGroup className="I-input mb-3">
                    {docs == "Driver License" ? (
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label="State of Vehicle Registration *"
                      >
                        <Form.Select
                          className="form-control"
                          value={selectedState}
                          onChange={handleStateSelect}
                          required
                          
                        >
                          <option value="">Select State</option>
                          {australianStates.map((state, index) => (
                            <option key={index} value={state}>
                              {state}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    ) : (
                      <FloatingLabel
                        controlId="floatingSelectGrid"
                        label="Country*"
                      >
                        <Form.Select
                          className="form-control"
                          value={selectedCountry}
                          onChange={handleCountrySelect}
                          name = "country"
                          required
                        >
                          <option value="">Select Country</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          ))}
                        </Form.Select>
                      </FloatingLabel>
                    )}
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <InputGroup className="I-input mb-3">
                    <FloatingLabel
                      controlId="floatingInputGrid"
                      label={docplaceholder}
                    >
                      <Form.Control
                        type="text"
                        name={
                          docs === "Driver License" || docs === ""
                            ? "licenceNumber"
                            : "passportnumber"
                        }
                        placeholder={docplaceholder}
                        onChange={handleChange}
                        maxLength={
                          docs === "Driver License" || docs === "" ? 8 : 9
                        }
                        required
                        style={{ paddingLeft: 6 }}
                      />
                    </FloatingLabel>
                  </InputGroup>
                </Col>
              </Row>

              <Row>
                <Col>
                  {docs == "Driver License" && (
                    <InputGroup className="I-input ">
                       <OverlayTrigger
                      placement="left"
                      overlay={
                        <Tooltip>
                         please turn your card to get card number, it should be 10 digit
                        </Tooltip>
                      }
                    >
                      <span className="mr-4  float-left">
                        <i className="fas fa-info-circle text-dark"></i>
                      </span>
                    </OverlayTrigger>
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label="Enter Card Number *"
                      >
                        <Form.Control
                          type="text"
                          name="cardNumberBack"
                          placeholder="Card Number "
                          onChange={handleChange}
                          required
                          style={{ paddingLeft: 6 }}
                        />
                       
                        <div className="invalid-feedback">{cardError}</div>
                      </FloatingLabel>
                    </InputGroup>
                  )}
                  
                </Col>
              </Row>

              {isFetching ? (
                <Button variant="dark" size="lg" disabled>
                  <Spinner animation="border" variant="light" />
                </Button>
              ) : (
                <button
                  className="advanced-button"
                  type="submit"
                  disabled={!otpcheck}
                >
                  Sign Up
                </button>
              )}
            </Container>
          </Form>
          <div className="login-link mt-3">
            <p>
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="text-decoration-none text-muted font-weight-bold"
              >
                Login here
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;
