import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { enGB } from "date-fns/locale";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SellerLayout from "../../components/Layout/Layout/SellerLayout";
import { createAuction } from "../../features/apiCall";
const locales = { "en-gb": enGB };
const CreateAuction = () => {
  const [locale, setLocale] = React.useState("en-gb");
  const today = dayjs();
  const todayStartOfTheDay = today.startOf("day");
  const { isFetching } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  const { carId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!carId) {
      navigate("/dashboard/seller/show-cars");
    }
  }, [carId, navigate]);
  const [seller_type, setSeller_type] = useState("private");
  const [showDetails, setshowDetails] = useState(false);
  const [formData, setFormData] = useState({
    auction_start_date: "",
    auction_start_time: "",
    auction_end_date: "",
    auction_end_time: "",
    company_name: "",
    show_hide_price: true,
    abn: "",
    asking_price: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "show_hide_price") {
      setFormData({
        ...formData,
        [name]: value === "true", // Convert the string value to a boolean
      });
    }
    let updatedValue = value;
    if (name === "company_name") {
      updatedValue = value.toUpperCase();
    }
    setFormData({ ...formData, [name]: updatedValue });
    // Check if it's an hour field and the entered value has 2 digits
  };

  const formatDate = () => {
    formData.auction_start_date = moment(
      formData.auction_start_date.format("MM/DD/YYYY")
    )?._i;

    formData.auction_end_date = moment(
      formData.auction_end_date.format("MM/DD/YYYY")
    )?._i;
    formData.auction_end_time = moment(
      formData.auction_end_time.format("HH:mm")
    )?._i;
    formData.auction_start_time = moment(
      formData.auction_start_time.format("HH:mm")
    )?._i;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formatDate();
    const {
      auction_start_date,
      auction_start_time,
      auction_end_date,
      auction_end_time,
      company_name,
      show_hide_price,
      abn,
      asking_price,
    } = formData;
    // console.log(
    //   auction_start_date,
    //   auction_end_date,
    //   auction_end_time,
    //   auction_start_time
    // );

    try {
      const success = await createAuction(dispatch, {
        auction_start_date,
        auction_start_time,
        auction_end_date,
        auction_end_time,
        seller_type,
        company_name,
        asking_price,
        show_hide_price,
        abn,
        carId,
      });
      if (success) {
        navigate("/dashboard/user/get-auction-status");
      }
    } catch (error) {
      // console.error("Auction creation failed:", error);
    }
  };
  const isValidTimeFormat = (time) => {
    const regex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
    return regex.test(time);
  };
  const handleOnError = (error, value) => {
    // Your logic to handle the error and value
    if (error) {
      console.error(`Error: ${error} for value: ${value}`);
      // Additional error handling code
    } else {
      // No error, do something with the valid value
      console.log(`Valid value: ${value}`);
      // Additional logic for valid value
    }
  };
  const handleRoleChange = (e) => {
    const selectedValue = e.target.value;
    setSeller_type(selectedValue);

    if (selectedValue === "company") {
      setshowDetails(true);
    } else if (selectedValue === "private") {
      setshowDetails(false);
      setFormData({ ...formData, company_name: "" });
    }
    // alert(seller_type);
  };

  const [error, setError] = React.useState(null);

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select a date in the first quarter of 2022";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);
  return (
    <SellerLayout>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={locales[locale]}
      >
        <h3>Create Auction </h3>
        <div className="radio-inputs m-auto">
          {/*listing.css */}
          <label className="radio mb-0">
            <input
              type="radio"
              name="seller_type"
              value="company"
              onChange={handleRoleChange}
            />
            <span className="name">COMPANY</span>
          </label>
          <label className="radio mb-0">
            <input
              type="radio"
              name="seller_type"
              value="private"
              onChange={handleRoleChange}
              defaultChecked
            />
            <span className="name">PRIVATE</span>
          </label>
        </div>
        <Form onSubmit={handleSubmit} className="seller-upload-form">
          {showDetails && (
            <>
              <table className="form-table">
                <tbody>
                  <tr>
                    <td>
                      <Form.Label> Company Name</Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={formData.company_name}
                        name="company_name"
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Form.Label>ABN.</Form.Label>
                      <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>Australian Business Number</Tooltip>}
                      >
                        <span className="ml-2">
                          <i className="fas fa-info-circle text-dark"></i>
                        </span>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={formData.abn}
                        name="abn"
                        onChange={handleChange}
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
            </>
          )}
          <table className="form-table">
            <tbody>
              <tr>
                <td>
                  <Form.Label>Auction Start Date</Form.Label>
                </td>
                <td>
                  <DatePicker
                    name="auction_start_date"
                    value={formData.auction_start_date}
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        auction_start_date: date,
                      })
                    }
                    format="DD/MM/YYYY"
                    renderInput={(params) => <Form.Control {...params} />}
                    minDate={today}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label>Auction Start Time</Form.Label>
                </td>
                <td>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      name="auction_start_time"
                      value={formData.auction_start_time}
                      onChange={(time) =>
                        setFormData({
                          ...formData,
                          auction_start_time: time,
                        })
                      }
                      renderInput={(params) => <Form.Control {...params} />}
                      required
                    />{" "}
                  </LocalizationProvider>
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label>Auction End Date</Form.Label>
                </td>
                <td>
                  <DatePicker
                    name="auction_end_date"
                    value={formData.auction_end_date}
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        auction_end_date: date,
                      })
                    }
                    format="DD/MM/YYYY"
                    renderInput={(params) => <Form.Control {...params} />}
                    minDate={today}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label>Auction End Time</Form.Label>
                </td>
                <td>
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      name="auction_end_time"
                      value={formData.auction_end_time}
                      onChange={(time) =>
                        setFormData({
                          ...formData,
                          auction_end_time: time,
                        })
                      }
                      renderInput={(params) => <Form.Control {...params} />}
                      required
                    />
                  </LocalizationProvider>
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label>Asking Price</Form.Label>
                </td>
                <td>
                  <Form.Control
                    type="number"
                    name="asking_price"
                    value={formData.asking_price}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>{" "}
              <tr>
                <td>
                  <Form.Label> Asking Price Visibilty</Form.Label>
                  <OverlayTrigger
                    placement="right"
                    overlay={
                      <Tooltip>
                        Want to show Asking Price to Buyers at website
                      </Tooltip>
                    }
                  >
                    <span className="ml-2">
                      <i className="fas fa-info-circle text-dark"></i>
                    </span>
                  </OverlayTrigger>
                </td>
                <td>
                  <div>
                    <label className="mr-3">
                      <input
                        type="radio"
                        name="show_hide_price"
                        value="true"
                        defaultChecked={formData.show_hide_price === true}
                        onChange={handleChange}
                      />{" "}
                      Shown
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="show_hide_price"
                        value="false"
                        defaultChecked={formData.show_hide_price === false}
                        onChange={handleChange}
                      />{" "}
                      Hidden
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="advanced-button m-3"
            type="submit"
            disabled={isFetching}
          >
            {isFetching ? "Submitting..." : "Submit"}
          </button>
        </Form>
      </LocalizationProvider>
    </SellerLayout>
  );
};

export default CreateAuction;

// import * as React from "react";
// export default function RenderErrorUnderField() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateTimePicker />
//     </LocalizationProvider>
//   );
// }
