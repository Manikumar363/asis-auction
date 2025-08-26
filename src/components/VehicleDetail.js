import React, { useEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
} from "../features/VehicleSlice.js";
import {
  autobid,
  executeWhenBid,
  sendQuery,
  updateAutobid,
} from "../features/apiCall";

import { io } from "socket.io-client";
import { placebid } from "../features/apiCall.js";
import axios from "../utils/axios.js";
import LeftInfo from "./LeftInfo.js";
import RightInfo from "./RightInfo.js";
import ProductCarousel from "./VehicleCarousel.js";
import id from "date-fns/esm/locale/id/index.js";
import '../styles/VehicleDetail.css';

const url = "https://api.asisauctions.com.au"; 
// const url  = "http://localhost:4000"

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div className="accordion-item">
    <button className="accordion-title" onClick={onClick}>
      {title}
      <span className="accordion-arrow">{isOpen ? '-' : '+'}</span>
    </button>
    {isOpen && <div className="accordion-content">{children}</div>}
  </div>
);

const ProductDetail = ({ auctionId }) => {
  const location = useLocation();
  const socket = useRef();
  const { isPlacingBid } = useSelector((state) => state.bid);
  const [CarDetails, setCarDetails] = useState(null);
  const [carId, setCarId] = useState("null]");
  const [amount, setAmount] = useState("");
  const [previewAmount, setPreviewAmount] = useState("");
  const [auction, setAuction] = useState([]);
  const [autoBidDetails, setAutoBidDetails] = useState([]);
  const [price, setPrice] = useState(null);
  const [reserveFlag, setReserveFlag] = useState(null);
  const [activeTab, setActiveTab] = useState("tab2");
  const { isFetching } = useSelector((state) => state.vehicle);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [autoBidEnabled, setAutoBidEnabled] = useState(false);
  const [autoBidValue, setAutoBidValue] = useState("");
  const [bidder,setBidder] = useState('')
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [vehicle_type, setVehicle_type] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const ErrorToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleBidChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);

    if (price != "No Bid") {
      const increment = 50;

      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout to wait for 2 seconds after the user stops typing
      const newTimeoutId = setTimeout(() => {
        // Ensure the value is a number
        if (!isNaN(value)) {
          // Round off to the nearest multiple of 50 greater than the current price
          const roundedValue =
            Math.ceil((value - price) / increment) * increment + price;

          // Update the state with the rounded value
          setPreviewAmount(roundedValue.toString());
        }
      });

      // Update the timeoutId state
      setTimeoutId(newTimeoutId);
    } else {
      if (value > 50) {
        const v = Math.ceil(value / 50) * 50; // Round off to the nearest greater multiple of 50
        const newTimeoutId = setTimeout(() => {
          setPreviewAmount(v);
        });
      } else {
        const v = 50; // Set v to 50 when the value is less than 50
        const newTimeoutId = setTimeout(() => {
          setPreviewAmount(v);
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const roundToNearestMultiple = (value, multiple) => {
    const roundedValue = Math.round(value / multiple) * multiple;
    return Math.max(roundedValue, multiple); // Ensure the rounded value is greater than the multiple
  };
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const fetchDetails = async () => {
    dispatch(GetCarsStart());
    try {
      const { data } = await axios.get(
        `/api/auction/get-auction-details/${auctionId}`,
        {
          headers: { Authorization: token },
        }
      );
   console.log(data,'data in fetchDeatils fun');
      setAuction(data?.auction);
      setCarDetails(data?.auction?.car);
      setVehicle_type(data?.auction?.car?.vehicle_type);
      const highestBidAmount =
        data.auction?.highest_bid === 0 ? "No Bid" : data.auction?.highest_bid;
      setPrice(highestBidAmount);
      setReserveFlag(data?.auction?.reserve_flag);
      const fetchedCarId = data?.auction?.car?._id;
      setCarId(fetchedCarId);
      const auctionEndTime = new Date(data?.auction?.auction_end);
      const auctionStartTime = new Date(data?.auction?.auction_start);
      const intervalId = setInterval(() => {
        const currentTime = new Date();
        let timeDifference;
        if (data.auction?.status == "inactive") {
          timeDifference = auctionStartTime - currentTime;
        } else {
          timeDifference = auctionEndTime - currentTime;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setTimer({
          days,
          hours,
          minutes,
          seconds,
        });
        if (timeDifference <= 0) {
          clearInterval(intervalId);
          if (data?.auction?.status != "closed") {
            fetchDetails();
          }
        }
      }, 1000);

      setIntervalId(intervalId);
      dispatch(GetCarsSuccess(data));
    } catch (error) {
      dispatch(GetCarsFailure());
    }
  };
  const fetchAutoBidDetails = async () => {
    try {
      const { data } = await axios.get(
        `/api/auto-bid/get-auto-bid/${auctionId}`,
        {
          headers: { Authorization: token },
        }
      );
      setAutoBidDetails(data?.auto_bid);
      // console.log(data?.auto_bid);
      if (data?.auto_bid?.autobid_active) {
        setAutoBidEnabled(true);
      }
    } catch (error) {
      dispatch(GetCarsFailure());
    }
  };
  const execute = async () => {
    await executeWhenBid(dispatch, { auctionId });
  };
  const handleBid = async (e) => {
    e.preventDefault();
    if (!token) {
      toast("Login to Place Bid", ErrorToastOptions);
      navigate("/login");
    } else {
      const increment = 50;
      if (typeof price === "number" && !isNaN(price)) {
        if (amount - price >= 50 && (amount - price) % 50 === 0) {
          let bid_amount = amount;
          try {
            let data = await placebid(dispatch, { bid_amount, auctionId });
            if (data) {
              setPrice(amount);
              fetchDetails();
              execute();
 console.log(data,'bidemit data');
              const dat2 = {
                bid_amount: data.bid.bid_amount,
                reserve_flag: data.reserve_flag,
                auction: auctionId,
                bidder :data?.bid.bidder
              };
                
              socket.current.emit("bidreceived", dat2);
              setAmount("");
            }
          } catch (error) {
             console.log(error ,'1');
            // toast.error("Try Again Later! 1", ErrorToastOptions);
          }

          // console.log("Condition met!");
        } 
        else if (amount<price){
          toast.error(
          
            `Bid is lesser than current bid price`,
            ErrorToastOptions
          );
        }
       
        else {
          
          toast.error(
            
            `Bid should be a multiple of $50, You can Bid $${previewAmount}`,
            ErrorToastOptions
          );
        }
      } else {
        if (amount % 50 === 0) {
          let bid_amount = amount;
          try {
            let data = await placebid(dispatch, { bid_amount, auctionId });
            if (data) {
              setPrice(amount);
              fetchDetails();
              execute();
              const dat2 = {
                bid_amount: data.bid.bid_amount,
                reserve_flag: data.reserve_flag,
                auction: auctionId,
                bidder :data?.bid.bidder

              };
              // console.log(dat2);
              setAmount("");

              socket.current.emit("bidreceived", dat2);

              // socket.emit("bidreceived", {
              //   data: {
              //     bid_amount: data.bid.auction.bid_amount,
              //     reserve_flag: data.reserve_flag,
              //     auctionId: auctionId,
              //   },
              // });
            }
          } catch (error) {
            console.log(error,'2');
            // toast.error("Try Again Later! 2", ErrorToastOptions);
          }

          // console.log("Condition met!");
        } else {
      
          toast.error(
            `Bid should be a multiple of $50, You can Bid $${previewAmount}`,
            ErrorToastOptions
          );
        }
      }
    }
  };

  useEffect(() => {
    socket.current = io(url);
    if (auctionId) {
      socket.current.emit("join", { auctionId });
    }
  }, []);

  useEffect(() => {
    if (socket && auction) {
      const handleBidEmitted = (data) => {
        const highestBidAmount =
          data.auction?.highest_bid === 0
            ? "No Bid"
            : data.auction?.highest_bid;
        setPrice(highestBidAmount);
        setReserveFlag(data?.auction?.reserve_flag);
        console.log("everything done");
        console.log(data ,'data.auction 1');
      };

      const handleSocketConnect = () => {
        // console.log("Socket connected successfully");
      };

      const handleSocketError = (err) => {
        // console.log(err);
      };

      const handleSocketDisconnect = () => {
        // console.log("Socket disconnected");
      };
         
      socket.current.on("bidemitted", (data) => {
        const highestBidAmount =
          data.auction?.highest_bid === 0
            ? "No Bid"
            : data.auction?.highest_bid;
        setPrice(highestBidAmount);
        setBidder(data?.data?.bidder)
        setReserveFlag(data?.auction?.reserve_flag);
        console.log( data?.data?.bidder ,'data.auction 2');
      });
      socket.current.on("connect", handleSocketConnect);
      socket.current.on("connect_error", handleSocketError);
      socket.current.on("disconnect", handleSocketDisconnect);

      return () => {
        socket.current.off("bidemitted", handleBidEmitted);
        socket.current.off("connect", handleSocketConnect);
        socket.current.off("connect_error", handleSocketError);
        socket.current.off("disconnect", handleSocketDisconnect);
      };
    }
  }, [socket, auction]);
  useEffect(() => {
    fetchDetails();
    fetchAutoBidDetails();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [dispatch, token, auctionId, price]);

  const contact = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;
    try {
      const uploadSuccess = await sendQuery(dispatch, {
        name,
        email,
        phone,
        message,
      });
      if (uploadSuccess) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        // console.log("Form data after clearing:", formData);
      }
    } catch (error) {
      // console.error("Error submitting query:", error);
      toast.error(
        "Error submitting query. Please try again.",
        ErrorToastOptions
      );
    }
  };
  // const handleRefresh = () => {
  //   fetchDetails();
  //   console.log("Refresh icon clicked!");
  // };

  const hasAuctionEnded =
    timer.days <= 0 &&
    timer.hours <= 0 &&
    timer.minutes <= 0 &&
    timer.seconds <= 0;

  const hasAuctionStarted =
    timer.days <= 0 &&
    timer.hours <= 0 &&
    timer.minutes <= 0 &&
    timer.seconds <= 0;

  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleButtonClick = (amount) => {
    console.log(amount);

    setSelectedAmount(amount);
    if (price !== "No Bid") {
      setAmount(price + amount);
    } else {
      setAmount(amount);
    }
    setPreviewAmount(amount);

    // Add any other logic you want to perform with the selected amount here
  };

  const handleAutoBidChange = async (e) => {
    const value = parseFloat(e.target.value);
    setAutoBidValue(value);
    if (price !== "No Bid") {
      if (price != value && value > price + 50) {
        const roundedValue = Math.ceil((value - price) / 50) * 50 + price;
        setPreviewAmount(roundedValue.toString());
      } else {
        setPreviewAmount(
          "SET Value should not be equal or less to current bid "
        );
      }
    } else {
      const roundedValue = Math.ceil(value / 50) * 50;
      setPreviewAmount(roundedValue.toString());
    }
  };

  const handleAutoBid = async (e) => {
    e.preventDefault();
    if (!token) {
      toast("Login to Place Bid", ErrorToastOptions);
      navigate("/login");
    } else {
      const increment = 50;

      try {
        console.log(autoBidValue, autoBidEnabled);
        let data = await autobid(dispatch, { autoBidValue, auctionId, setAutoBidEnabled,autoBidEnabled });
        if (data) {
          setPrice(amount);
          fetchDetails();
        
          const dat2 = {
            bid_amount: data?.bid?.bid_amount,
            reserve_flag: data?.reserve_flag,
            auction: auctionId,
            bidder :data?.bid?.bidder

          };
          console.log(data,'data in 472');
          console.log(dat2);
          socket.current.emit("bidreceived", dat2);

        }
      } catch (error) {
        console.log(error,'error 3');
        // toast.error("Try Again Later! 3", ErrorToastOptions);
      }
      // } else {
      //   toast.error(
      //     "Your SET value should be atleast greater than $50 increment from latest bid!"
      //   );
      // }
    }
  };
  const handleAutoBidUpdate = async (e) => {
    e.preventDefault();
    if (!token) {
      toast("Login to Place Bid", ErrorToastOptions);
      navigate("/login");
    } else {
      const increment = 50;

      if (price < autoBidValue + 50) {
        // console.log(previewAmount);
        try {
          let data = await updateAutobid(dispatch, { autoBidValue, auctionId });
          if (data) {
            setPrice(amount);
            // fetchDetails();
            // execute();
            const dat2 = {
              bid_amount: data?.bid?.bid_amount,
              reserve_flag: data?.reserve_flag,
              auction: auctionId,
              bidder :data?.bid?.bidder

            };
            console.log(dat2);
            socket.current.emit("bidreceived", dat2);
          }
        } catch (error) {
          console.log(error,'error is printing');
          // toast.error("try again later 4", ErrorToastOptions);
        }
      } else {
        toast.error(
          "Your SET value should be atleast greater than $50 increment from latest bid!"
        );
      }
    }
  };
  return (
    <>
      <section className="vehicle-detail-section">
        <div className="vehicle-detail-container">
          <div className="vehicle-detail-left">
            <ProductCarousel carId={carId} />
          </div>
          <div className="vehicle-detail-right">
            <div className="vehicle-title-row">
              <h2>{CarDetails?.model || "TATA Truck vehicle"}</h2>
              <span className={`status-badge ${auction?.status}`}>{auction?.status}</span>
            </div>
            
            <div className="vehicle-bid-info">
              <div className="vehicle-bid-row">
                <div>
                  <span className="vehicle-bid-label">Highest Bid:</span>
                  <span className="vehicle-bid-value">$ {auction?.highest_bid || 3500}</span>
                </div>
                <div>
                  <span className="vehicle-bid-label">Asking Price:</span>
                  <span className="vehicle-bid-value">$ {auction?.asking_price || 5000}</span>
                </div>
              </div>
              <div className="vehicle-bid-note">
                <span className="bid-note-icon">ⓘ</span>
                Price does not include a $100 Buyer Administrative Fee. Any additional Credit Card / PayPal surcharges are not covered and will be applied. Bid should be of at least of $50 increment.
              </div>
            </div>

            <div className="vehicle-accordion">
              <AccordionItem
                title="Truck Details"
                isOpen={activeTab === "tab1"}
                onClick={() => handleTabClick("tab1")}
              >
                <table className="vehicle-details-table">
                  <tbody>
                    <tr>
                      <td className="vehicle-details-label">Make:</td>
                      <td className="vehicle-details-value">{CarDetails?.make || "IVECO"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Manufacturing Year:</td>
                      <td className="vehicle-details-value">{CarDetails?.manufacturing_year || "2023"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Fuel Type:</td>
                      <td className="vehicle-details-value">{CarDetails?.fuel_type || "DIESEL"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Color:</td>
                      <td className="vehicle-details-value">{CarDetails?.color || "GREEN"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Odometer:</td>
                      <td className="vehicle-details-value">{CarDetails?.odometer || "18000"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Vin No.:</td>
                      <td className="vehicle-details-value">{CarDetails?.vin || "kuyt567yhf5678"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">No of Cylinders:</td>
                      <td className="vehicle-details-value">{CarDetails?.no_of_cylinders || "12"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Transmission:</td>
                      <td className="vehicle-details-value">{CarDetails?.transmission || "Manual"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Body Type:</td>
                      <td className="vehicle-details-value">{CarDetails?.body_type || "TIPPER"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Engine Power:</td>
                      <td className="vehicle-details-value">{CarDetails?.engine_power || "30.3"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">GVM:</td>
                      <td className="vehicle-details-value">{CarDetails?.gvm || "47000"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Axle Configuration:</td>
                      <td className="vehicle-details-value">{CarDetails?.axle_configuration || "Single Axle (SA)"}</td>
                    </tr>
                  </tbody>
                </table>
              </AccordionItem>
              
              <AccordionItem
                title="Description"
                isOpen={activeTab === "tab2"}
                onClick={() => handleTabClick("tab2")}
              >
                <div className="vehicle-description">
                  {CarDetails?.description || "for a meeting next week? We would love to walk you through the project and discuss any additional questions or requirements you may have. Thank you again for your continued support. We're here to help, so please don't hesitate to reach out."}
                </div>
              </AccordionItem>
              
              <AccordionItem
                title="Truck Location"
                isOpen={activeTab === "tab3"}
                onClick={() => handleTabClick("tab3")}
              >
                <table className="vehicle-details-table">
                  <tbody>
                    <tr>
                      <td className="vehicle-details-label">State:</td>
                      <td className="vehicle-details-value">{CarDetails?.state || "Victoria"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Suburb:</td>
                      <td className="vehicle-details-value">{CarDetails?.suburb || "Jeeralang Junction"}</td>
                    </tr>
                    <tr>
                      <td className="vehicle-details-label">Postal Code:</td>
                      <td className="vehicle-details-value">{CarDetails?.postal_code || "3840"}</td>
                    </tr>
                  </tbody>
                </table>
              </AccordionItem>
            </div>
          </div>
        </div>
      </section>

      <section className="vehicle-contact-section">
        <div className="vehicle-contact-bg">
          <div className="vehicle-contact-content">
            <div className="vehicle-contact-questions">
              <h2>Example Questions to Ask</h2>
              <p>Reach out anytime — we're just a call or message away!</p>
              <ul>
                <li>Can I book a test drive?</li>
                <li>What is your address and opening hours?</li>
                <li>Is there a warranty on auctioned vehicles?</li>
              </ul>
            </div>
            <form className="vehicle-contact-form" onSubmit={contact}>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name" 
                required 
              />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address" 
                required 
              />
              <input 
                type="text" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number" 
                required 
              />
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message" 
                rows={4} 
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;