import React from "react";
import { GetAuctions } from "../features/apiCall";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import '../styles/home-product-carousel.css'
import CarCard from "./CarProductCard";

const ProductCarousel = () => {
  const [filterdata, setfilterdata] = useState([])
  const navigate = useNavigate();
  const isBidExpired = (expiryDate) => {
    const expiry = new Date(expiryDate);

    const currentDate = new Date();

    if (expiry < currentDate) {
      return true;
    } else {
      return false;
    }
  };
  const BidRecentlyExpired = (expirationDate) => {
    const currentDate = new Date();
    const indianCurrentDate = new Date(
      currentDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    expirationDate = new Date(expirationDate);

    // Check if the bid expired at the moment or within the past day in Indian time zone
    return (
      expirationDate <= indianCurrentDate &&
      indianCurrentDate - expirationDate <= 24 * 60 * 60 * 1000
    );
  };
  const isBidRecentlyStarted = (startDate) => {
    const currentDate = new Date();
    const indianCurrentDate = new Date(
      currentDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    startDate = new Date(startDate);

    // Check if the bid has recently started (within the past day) in Indian time zone
    return (
      startDate <= indianCurrentDate &&
      indianCurrentDate - startDate <= 24 * 60 * 60 * 1000
    );
  };
  const isUpcoming = (startDate) => {
    const start = new Date(startDate);
    const currentDate = new Date();
    if (currentDate < start) {
      return true;
    } else {
      return false;
    }
  };

  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);
  const [status, setStatus] = useState("Ongoing");
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAuctions(dispatch, {
          selectedYear: "",
          selectedModel: "",
          selectedManufacturer: "",
          selectedStatus: "",
          currentPage: "",
          pageSize: "",
          selectedState: "",
          vehicle_type: "",
        });
        setCars(data.auctions);
      } catch (error) {
        alert(error);
      }
    };
    fetchData();

  }, []);
  useEffect(() => {
    handleDatatoShow()
  }, [cars])
  const handleDatatoShow = (val = "Ongoing") => {
    var data = [];

    if (val === "Upcoming") {

      data = cars.filter(
        (item, index) =>
          isUpcoming(item.auction_start) && !isBidExpired(item.auction_end) && index <= 12
      );
    }
    if (val === "Ongoing") {

      data = cars.filter(
        (item, index) =>
          !isUpcoming(item.auction_start) && !isBidExpired(item.auction_end) && index <= 12
      );
    }
    if (val === "Closed") {

      data = cars.filter((item) => isBidExpired(item.auction_end));
    }
    if (val === "Recently Closed") {

      data = cars.filter(
        (item, index) =>
          (BidRecentlyExpired(item.auction_end))
      );
    }
    if (val === "Recently Started") {

      data = cars.filter(
        (item, index) =>
        (isBidRecentlyStarted(item.auction_start) &&

          !isBidExpired(item.auction_end) && index <= 12)
      );
    }
    console.log(data);
    setfilterdata(data)
  };
  const dateformatter = (date) => {
    const res = new Date(date)
    return `${res.getDate()}-${res.getMonth() + 1}-${res.getFullYear()}`
  }
  return (
    <>
      <div className="homepage_select">
        <p style={{ marginBottom: "7px" }}>Auction Status</p>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            setStatus(e.target.value);
            handleDatatoShow(e.target.value);
          }}

        >
          <option value="Ongoing">Ongoing</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Closed">Closed</option>
          <option value="Recently Closed">Recently Closed</option>
          <option value="Recently Started"> Recently Started</option>
        </Form.Select>
      </div>
      <div
        className="homepage-cars-layout"
        style={{ position: "relative", padding: "30px 30px 30px 0" }}
      >
        {filterdata.length > 0 ? filterdata.map((item, index) => {
          return (
            <>
              {status === "Upcoming" && (
                <>
                  {isUpcoming(item.auction_start) &&
                    !isBidExpired(item.auction_end) ? (
                    <Link to={`/auction/${item._id}`}>
                      <div
                        key={index}
                        style={{
                          minHeight: "100%",
                          minWidth: "100%",
                          borderShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          background: "white",
                          borderRadius: "10px ",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            marginTop: "10px",
                            padding: "",
                          }}
                        >
                          <div
                            style={{ height: "200px", position: "relative" }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "10px 10px 0px 0px",
                              }}
                              src={item.car.images[0]}
                            />
                            {(
                              <button
                                style={{
                                  background: "#00008B",
                                  color: "white",
                                  border: "none",
                                  height: "40px",
                                  padding: "10px",
                                  fontWeight: "bolder",
                                  position: "absolute",
                                  top: "0px",
                                  left: "0px",
                                  textAlign: "center",
                                }}
                              >
                                Upcoming
                              </button>
                            )}
                          </div>
                          <div
                            style={{
                              minWidth: "100%",
                              display: "flex",
                              flexDirection: "column",
                              padding: "0px 0px 0px 30px",
                            }}
                          >
                            <p
                              style={{
                                textAlign: "left",
                                fontWeight: "bold",
                                color: "black",
                                marginBottom: "0px",
                              }}
                            >
                              {item.car.model} <br />{" "}
                            </p>
                            <p
                              style={{
                                margin: "0px",
                                textAlign: "left",
                                fontWeight: "600",
                                color: "black",
                                fontSize: "small",
                                color: "#008000",

                                width: "fit-content",
                                padding: "0px 4px",
                                borderRadius: "6px",
                              }}
                            >
                              Starting at: {dateformatter(item.auction_start)}
                            </p>
                          </div>

                          <div
                            style={{
                              textAlign: "left",
                              position: "relative",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",

                              alignItems: "flex-end",
                              textAlign: "left",
                              width: "100%",
                              padding: "10px 30px",
                              fontColor: "black",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              <p
                                className="car-desc"
                                style={{
                                  fontSize: "small",
                                  width: "100%",
                                  margin: "0px",
                                }}
                              >
                                {item.car.description}
                              </p>
                            </div>

                            <div style={{ width: "100%", marginTop: "4px" }}>
                              <div
                                className="row1 d-flex flex-wrap"
                                style={{ gap: "2px" }}
                              >
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.fuel_type}
                                </p>
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.transmission_type}
                                </p>
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.odometer_reading}Kms
                                </p>
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.num_of_cylinders} cylinders
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <CarCard status="Upcoming" date={dateformatter(item.auction_start)} imgSrc={item.car.images[0]} carModel={item.car.model} highestBid={item.highest_bid} desc={item.car.description} fuel={item.car.fuel_type} transmission_type={item.car.transmission_type} odometer={item.car.odometer_reading} cylinders={item.car.num_of_cylinders} isUpcoming={isUpcoming(item.auction_start)} /> */}
                    </Link>
                  ) : (
                    <>

                    </>
                  )}
                </>
              )}
              {status === "Ongoing" && (
                <>
                  {!isUpcoming(item.auction_start) &&
                    !isBidExpired(item.auction_end) && (
                      <Link to={`/auction/${item._id}`}>
                        {/* <div
                          key={index}
                          className="prodcard"
                          style={{
                            minHeight: "100%",
                            minWidth: "100%",
                            borderShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            background: "white",
                            borderRadius: "10px ",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginTop: "10px",
                              padding: "",
                            }}
                          >
                            <div
                              style={{ height: "200px", position: "relative" }}
                            >
                              <img
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "10px 10px 0px 0px",
                                }}
                                src={item.car.images[0]}
                              />
                              {!isUpcoming(item.auction_start) && (
                                <button
                                  style={{
                                    background: "#C2FBD7",
                                    color: "#008000",
                                    border: "none",
                                    height: "40px",
                                    padding: "10px",
                                    fontWeight: "bolder",
                                    position: "absolute",
                                    top: "0px",
                                    left: "0px",
                                    textAlign: "center",
                                  }}
                                >
                                  Ongoing
                                </button>
                              )}
                            </div>
                            <div
                              style={{
                                minWidth: "100%",
                                display: "flex",
                                flexDirection: "column",
                                padding: "0px 0px 0px 30px",
                              }}
                            >
                              <p
                                style={{
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  color: "black",
                                  marginBottom: "0px",
                                }}
                              >
                                {item.car.model} <br />{" "}
                              </p>
                              <p
                                style={{
                                  margin: "0px",
                                  textAlign: "left",
                                  fontWeight: "600",
                                  color: "black",
                                  fontSize: "small",
                                  color: "#008000",
                                  background: "#C2FBD7",
                                  width: "fit-content",
                                  padding: "0px 4px",
                                  borderRadius: "6px",
                                }}
                              >
                                Current Bid: {item.highest_bid}$
                              </p>
                            </div>

                            <div
                              style={{
                                textAlign: "left",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",

                                alignItems: "flex-end",
                                textAlign: "left",
                                width: "100%",
                                padding: "10px 30px",
                                fontColor: "black",
                              }}
                            >
                              <div style={{ width: "100%" }}>
                                <p
                                  className="car-desc"
                                  style={{
                                    fontSize: "small",
                                    width: "100%",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.description}
                                </p>
                              </div>

                              <div style={{ width: "100%", marginTop: "4px" }}>
                                <div
                                  className="row1 d-flex flex-wrap"
                                  style={{ gap: "2px" }}
                                >
                                  <p
                                    style={{
                                      fontSize: "small",
                                      textAlign: "center",
                                      background: "#fafafa",
                                      padding: "0 4px",
                                      color: "#465166",
                                      fontWeight: "500",
                                      height: "25px",
                                      borderRadius: "6px",
                                      margin: "0px",
                                    }}
                                  >
                                    {item.car.fuel_type}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "small",
                                      textAlign: "center",
                                      background: "#fafafa",
                                      padding: "0 4px",
                                      color: "#465166",
                                      fontWeight: "500",
                                      height: "25px",
                                      borderRadius: "6px",
                                      margin: "0px",
                                    }}
                                  >
                                    {item.car.transmission_type}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "small",
                                      textAlign: "center",
                                      background: "#fafafa",
                                      padding: "0 4px",
                                      color: "#465166",
                                      fontWeight: "500",
                                      height: "25px",
                                      borderRadius: "6px",
                                      margin: "0px",
                                    }}
                                  >
                                    {item.car.odometer_reading}Kms
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "small",
                                      textAlign: "center",
                                      background: "#fafafa",
                                      padding: "0 4px",
                                      color: "#465166",
                                      fontWeight: "500",
                                      height: "25px",
                                      borderRadius: "6px",
                                      margin: "0px",
                                    }}
                                  >
                                    {item.car.num_of_cylinders} cylinders
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div> */}

                        <CarCard imgSrc={item.car.images[0]} carModel={item.car.model} highestBid={item.highest_bid} desc={item.car.description} fuel={item.car.fuel_type} transmission_type={item.car.transmission_type} odometer={item.car.odometer_reading} cylinders={item.car.num_of_cylinders} isUpcoming={isUpcoming(item.auction_start)} />

                      </Link>

                    )}
                </>
              )}
              {status === "Closed" && (
                <>
                  {isBidExpired(item.auction_end) && index <= 12 && (
                    <Link to={`/auction/${item._id}`}>
                      {/* <div
                        key={index}
                        style={{
                          minHeight: "100%",
                          minWidth: "100%",
                          borderShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          background: "white",
                          borderRadius: "10px ",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            marginTop: "10px",
                            padding: "",
                          }}
                        >
                          <div
                            style={{ height: "200px", position: "relative" }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "10px 10px 0px 0px",
                              }}
                              src={item.car.images[0]}
                            />
                            <button
                              style={{
                                background: "#F29292",
                                color: "#800D0D",
                                border: "none",
                                height: "40px",
                                padding: "10px",
                                fontWeight: "bolder",
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                textAlign: "center",
                              }}
                            >
                              Ended
                            </button>
                          </div>
                          <div
                            style={{
                              minWidth: "100%",
                              display: "flex",
                              flexDirection: "column",
                              padding: "0px 0px 0px 30px",
                            }}
                          >
                            <p
                              style={{
                                textAlign: "left",
                                fontWeight: "bold",
                                color: "black",
                                marginBottom: "0px",
                              }}
                            >
                              {item.car.model} <br />{" "}
                            </p>
                            <p
                              style={{
                                margin: "0px",
                                textAlign: "left",
                                fontWeight: "600",
                                color: "black",
                                fontSize: "small",
                                background: "#F29292",
                                color: "#800D0D",
                                width: "fit-content",
                                padding: "0px 4px",
                                borderRadius: "6px",
                              }}
                            >
                              Highest Bid: {item.highest_bid}$
                            </p>
                          </div>

                          <div
                            style={{
                              textAlign: "left",
                              position: "relative",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",

                              alignItems: "flex-end",
                              textAlign: "left",
                              width: "100%",
                              padding: "10px 30px",
                              fontColor: "black",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              <p
                                className="car-desc"
                                style={{
                                  fontSize: "small",
                                  width: "100%",
                                  margin: "0px",
                                }}
                              >
                                {item.car.description}
                              </p>
                            </div>

                            <div style={{ width: "100%", marginTop: "4px" }}>
                              <div
                                className="row1 d-flex flex-wrap"
                                style={{ gap: "2px" }}
                              >
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.fuel_type}
                                </p>
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.transmission_type}
                                </p>
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.odometer_reading}Kms
                                </p>
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.num_of_cylinders} cylinders
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <CarCard status={"Closed"} imgSrc={item.car.images[0]} carModel={item.car.model} highestBid={item.highest_bid} desc={item.car.description} fuel={item.car.fuel_type} transmission_type={item.car.transmission_type} odometer={item.car.odometer_reading} cylinders={item.car.num_of_cylinders} isUpcoming={isUpcoming(item.auction_start)} />
                    </Link>
                  )}
                </>
              )}
              {status === "Recently Closed" && (

                <>
                  {BidRecentlyExpired(item.auction_end) && (
                    <Link to={`/auction/${item._id}`}>
                      {/* <div
                        key={index}
                        style={{
                          minHeight: "100%",
                          minWidth: "100%",
                          borderShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                          background: "white",
                          borderRadius: "10px ",
                        }}
                      >
                        <div
                          style={{
                            width: "100%",
                            marginTop: "10px",
                            padding: "",
                          }}
                        >
                          <div
                            style={{ height: "200px", position: "relative" }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "10px 10px 0px 0px",
                              }}
                              src={item.car.images[0]}
                            />
                            <button
                              style={{
                                background: "#F29292",
                                color: "#800D0D",
                                border: "none",
                                height: "40px",
                                padding: "10px",
                                fontWeight: "bolder",
                                position: "absolute",
                                top: "0px",
                                left: "0px",
                                textAlign: "center",
                              }}
                            >
                              Ended
                            </button>
                          </div>
                          <div
                            style={{
                              minWidth: "100%",
                              display: "flex",
                              flexDirection: "column",
                              padding: "0px 0px 0px 30px",
                            }}
                          >
                            <p
                              style={{
                                textAlign: "left",
                                fontWeight: "bold",
                                color: "black",
                                marginBottom: "0px",
                              }}
                            >
                              {item.car.model} <br />{" "}
                            </p>
                            <p
                              style={{
                                margin: "0px",
                                textAlign: "left",
                                fontWeight: "600",
                                color: "black",
                                fontSize: "small",
                                background: "#F29292",
                                color: "#800D0D",
                                width: "fit-content",
                                padding: "0px 4px",
                                borderRadius: "6px",
                              }}
                            >
                              Highest Bid: {item.highest_bid}$
                            </p>
                          </div>

                          <div
                            style={{
                              textAlign: "left",
                              position: "relative",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",

                              alignItems: "flex-end",
                              textAlign: "left",
                              width: "100%",
                              padding: "10px 30px",
                              fontColor: "black",
                            }}
                          >
                            <div style={{ width: "100%" }}>
                              <p
                                className="car-desc"
                                style={{
                                  fontSize: "small",
                                  width: "100%",
                                  margin: "0px",
                                }}
                              >
                                {item.car.description}
                              </p>
                            </div>

                            <div style={{ width: "100%", marginTop: "4px" }}>
                              <div
                                className="row1 d-flex flex-wrap"
                                style={{ gap: "2px" }}
                              >
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.fuel_type}
                                </p>
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.transmission_type}
                                </p>
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.odometer_reading}Kms
                                </p>
                                <p
                                  style={{
                                    fontSize: "small",
                                    textAlign: "center",
                                    background: "#fafafa",
                                    padding: "0 4px",
                                    color: "#465166",
                                    fontWeight: "500",
                                    height: "25px",
                                    borderRadius: "6px",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.num_of_cylinders} cylinders
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      <CarCard status={"Closed"} imgSrc={item.car.images[0]} carModel={item.car.model} highestBid={item.highest_bid} desc={item.car.description} fuel={item.car.fuel_type} transmission_type={item.car.transmission_type} odometer={item.car.odometer_reading} cylinders={item.car.num_of_cylinders} isUpcoming={isUpcoming(item.auction_start)} />
                    </Link>
                  )}
                </>
              )}

              {status === "Recently Started" && (
                <>

                  {isBidRecentlyStarted(item.auction_start) &&

                    !isBidExpired(item.auction_end) && (
                      <Link to={`/auction/${item._id}`}>
                        <div
                          key={index}
                          style={{
                            minHeight: "100%",
                            minWidth: "100%",
                            borderShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            background: "white",
                            borderRadius: "10px ",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              marginTop: "10px",
                              padding: "",
                            }}
                          >
                            <div
                              style={{ height: "200px", position: "relative" }}
                            >
                              <img
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "10px 10px 0px 0px",
                                }}
                                src={item.car.images[0]}
                              />
                              {!isUpcoming(item.auction_start) && (
                                <button
                                  style={{
                                    background: "#C2FBD7",
                                    color: "#008000",
                                    border: "none",
                                    height: "40px",
                                    padding: "10px",
                                    fontWeight: "bolder",
                                    position: "absolute",
                                    top: "0px",
                                    left: "0px",
                                    textAlign: "center",
                                  }}
                                >
                                  Ongoing
                                </button>
                              )}
                            </div>
                            <div
                              style={{
                                minWidth: "100%",
                                display: "flex",
                                flexDirection: "column",
                                padding: "0px 0px 0px 30px",
                              }}
                            >
                              <p
                                style={{
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  color: "black",
                                  marginBottom: "0px",
                                }}
                              >
                                {item.car.model} <br />{" "}
                              </p>
                              <p
                                style={{
                                  margin: "0px",
                                  textAlign: "left",
                                  fontWeight: "600",
                                  color: "black",
                                  fontSize: "small",
                                  color: "#008000",
                                  background: "#C2FBD7",
                                  width: "fit-content",
                                  padding: "0px 4px",
                                  borderRadius: "6px",
                                }}
                              >
                                Current Bid: {item.highest_bid}$
                              </p>
                            </div>

                            <div
                              style={{
                                textAlign: "left",
                                position: "relative",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",

                                alignItems: "flex-end",
                                textAlign: "left",
                                width: "100%",
                                padding: "10px 30px",
                                fontColor: "black",
                              }}
                            >
                              <div style={{ width: "100%" }}>
                                <p
                                  className="car-desc"
                                  style={{
                                    fontSize: "small",
                                    width: "100%",
                                    margin: "0px",
                                  }}
                                >
                                  {item.car.description}
                                </p>
                              </div>

                              <div style={{ width: "100%", marginTop: "4px" }}>
                                <div
                                  className="row1 d-flex flex-wrap"
                                  style={{ gap: "2px" }}
                                >
                                  <p
                                    style={{
                                      fontSize: "small",
                                      textAlign: "center",
                                      background: "#fafafa",
                                      padding: "0 4px",
                                      color: "#465166",
                                      fontWeight: "500",
                                      height: "25px",
                                      borderRadius: "6px",
                                      margin: "0px",
                                    }}
                                  >
                                    {item.car.fuel_type}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "small",
                                      textAlign: "center",
                                      background: "#fafafa",
                                      padding: "0 4px",
                                      color: "#465166",
                                      fontWeight: "500",
                                      height: "25px",
                                      borderRadius: "6px",
                                      margin: "0px",
                                    }}
                                  >
                                    {item.car.transmission_type}
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "small",
                                      textAlign: "center",
                                      background: "#fafafa",
                                      padding: "0 4px",
                                      color: "#465166",
                                      fontWeight: "500",
                                      height: "25px",
                                      borderRadius: "6px",
                                      margin: "0px",
                                    }}
                                  >
                                    {item.car.odometer_reading}Kms
                                  </p>
                                  <p
                                    style={{
                                      fontSize: "small",
                                      textAlign: "center",
                                      background: "#fafafa",
                                      padding: "0 4px",
                                      color: "#465166",
                                      fontWeight: "500",
                                      height: "25px",
                                      borderRadius: "6px",
                                      margin: "0px",
                                    }}
                                  >
                                    {item.car.num_of_cylinders} cylinders
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <CarCard status={"Ongoing"} imgSrc={item.car.images[0]} carModel={item.car.model} highestBid={item.highest_bid} desc={item.car.description} fuel={item.car.fuel_type} transmission_type={item.car.transmission_type} odometer={item.car.odometer_reading} cylinders={item.car.num_of_cylinders} isUpcoming={isUpcoming(item.auction_start)} /> */}
                      </Link>
                    )}
                </>
              )}
            </>
          );
        }) : <><div
          style={{

            width: "85vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "fit-content",

              borderRadius: "10px",
              color: "black",
              background: "#F4C23D",
              padding: "10px 30px",
              opacity: "0.9"
            }}
          >
            <h9>There are no {status} auctions</h9>
            <h6 style={{ cursor: "pointer" }} onClick={() => { navigate("/SeeAll") }}>View other categories <span><i class="fa-solid fa-arrow-right"></i></span></h6>
          </div>
        </div></>}

      </div>
    </>
  );
};

export default ProductCarousel;
