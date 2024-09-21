import React, { memo, useState } from "react";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Timer from "./Timer.js";
const LeftInfo = memo(
  ({
    auction,
    timer,
    // handleRefresh,
    amount,
    handleBidChange,
    handleBid,
    formData,
    handleChange,
    contact,
    price,
    reserve_flag,
    vehicle_type,
    selectedAmount,
    setSelectedAmount,
    handleButtonClick,
    setPreviewAmount,
    previewAmount,
    ErrorToastOptions,
    handleAutoBid,
    autoBidEnabled,
    setAutoBidEnabled,
    autoBidValue,
    setAutoBidValue,
    handleAutoBidChange,
    autoBidDetails,
    handleAutoBidUpdate,
    bidder
  }) => {
    const { isFetching } = useSelector((state) => state.vehicle);
    const { isAutoBid } = useSelector((state) => state.bid);
    const { isPlacingBid } = useSelector((state) => state.bid);
    const [showUpdateField, setShowUpdateField] = useState(false);
   console.log(bidder,'bidder in leftinfo');
    const hasAuctionEnded =
      timer.days <= 0 &&
      timer.hours <= 0 &&
      timer.minutes <= 0 &&
      timer.seconds <= 0;
   console.log(previewAmount,'previewAmount' ,autoBidValue,'autoBidValue', price ,'price');
   const userId = useSelector((state)=>state.auth.user)
   console.log(bidder,'bidder');
    return (
      <div id="left-info ">
        <div className="details">
          {/* <div className="up-content clearfix d-flex  ">
              <h1>{auction?.car?.model}</h1>
            </div> */}
          <div className="head-side-bar ">
            <div className="status-tooltip" style={{ zIndex: "1" }}>
              <div
                style={{ right: "0px" }}
                className={`status-popup ${
                  auction?.status === "active"
                    ? "Ongoing"
                    : auction?.status === "inactive"
                    ? "NotStarted"
                    : "Closed"
                }`}
              >
                {auction?.status === "active"
                  ? "Ongoing "
                  : auction?.status === "inactive"
                  ? "Not Started"
                  : "Closed"}
              </div>
            </div>
            <h4>{auction?.car?.model}</h4>
          </div>
          <div className="p-2 pt-3 ">
            <Timer timer={timer} status={auction?.status} />
            <div className="f-direc-col d-flex  align-content-center justify-content-between">
              <div>
                {hasAuctionEnded ? (
                  <span className="m-0 h5">
                    {/* <i
                      className="fas fa-sync refresh-icon justify-self-end"
                      onClick={handleRefresh}
                    /> */}
                    HIGHEST BID{" "}
                  </span>
                ) : (
                  <span className="m-0 h5">
                    {/* <i
                      className="fas fa-sync refresh-icon justify-self-end"
                      onClick={handleRefresh}
                    /> */}
                    CURRENT BID{" "}
                  </span>
                )}

                <span style={{ color: "red" }} className="h5">
                  $ {price}{" "}
                </span>
              </div>
              <div>
                {isFetching ? (
                  <div className="">
                    <p className="text-info font-weight-bold">Hold on !</p>
                  </div>
                ) : (
                  <>
                    <p>
                      <>
                        {auction?.show_hide_price ? (
                          <>
                            <span className="text-info font-weight-bold">
                              ASKING PRICE{" "}
                            </span>
                            <span> $ {auction?.asking_price}</span>
                            <br />
                          </>
                        ) : (
                          <>
                            <p>
                              <p className="text-primary font-weight-bold text-uppercase">
                                {reserve_flag}
                                <OverlayTrigger
                                  placement="left"
                                  overlay={
                                    <Tooltip>
                                      "The reserve represents a predetermined
                                      amount chosen by the seller. When the
                                      reserve is reached, it will be highlighted
                                      in green, and the top bidder at that point
                                      will secure the item."
                                    </Tooltip>
                                  }
                                >
                                  <span className="ml-2">
                                    <i className="fas fa-info-circle text-dark"></i>
                                  </span>
                                </OverlayTrigger>
                              </p>
                            </p>
                          </>
                        )}
                       
                      </>
                    </p>
                  </>
                )}
              </div>
            </div>
            <br />
            <p className="text-mute font-weight-bold">
              Price does not include a $100 Buyer Administrative Fee. Any
              additional Credit Card / PayPal surcharges are not covered and
              will be applied.Bid should be of atleast of $50 increment
            </p>
            {!autoBidEnabled && (
              <>
                {auction?.status === "inactive" ||
                  (!hasAuctionEnded && (
                    <>
                      {/* <p className="text-danger">
                        Suggested Bid i.e ${previewAmount}
                      </p> */}
                      <form
                        className="f-direc-col d-flex justify-content-between mb-3"
                        onSubmit={handleBid}
                      >
                        <div
                          className="d-flex justify-content-around align-content-center w-100"
                          style={{ flexWrap: "wrap-reverse" }}
                        >
                          <div>
                            {!isPlacingBid ? (
                              <ReactPlaceholder
                                type="text"
                                color="#F0F0F0"
                                showLoadingAnimation
                                rows={5}
                                style={{ width: "80%" }}
                                ready={!isPlacingBid}
                              >
                                <button
                                  type="submit"
                                  className="advanced-button m-0"
                                >
                                  <i class="fas fa-gavel" /> Place Bid
                                </button>
                              </ReactPlaceholder>
                            ) : (
                              <div className="advanced-button text-center">
                                <Spinner
                                  width={{ width: "10px", height: "10px" }}
                                />
                              </div>
                            )}
                          </div>

                          <input
                            className="text-center place-input"
                            type="number"
                            name="bid_amount"
                            placeholder="Price"
                            value={amount}
                            onChange={handleBidChange}
                            required
                          />
                        </div>
                      </form>
                    </>
                  ))}
                {auction?.status === "inactive" ||
                  (!hasAuctionEnded && (
                    <div className="d-flex justify-content-between mb-5">
                      <button
                        className={`btn ${
                          selectedAmount === 50 ? "btn-info" : "btn-secondary"
                        }`}
                        onClick={() => handleButtonClick(50)}
                      >
                        $50
                      </button>
                      <button
                        className={`btn ${
                          selectedAmount === 100 ? "btn-info" : "btn-secondary"
                        }`}
                        onClick={() => handleButtonClick(100)}
                      >
                        $100
                      </button>
                      <button
                        className={`btn ${
                          selectedAmount === 200 ? "btn-info" : "btn-secondary"
                        }`}
                        onClick={() => handleButtonClick(200)}
                      >
                        $200
                      </button>
                      <button
                        className={`btn ${
                          selectedAmount === 500 ? "btn-info" : "btn-secondary"
                        }`}
                        onClick={() => handleButtonClick(500)}
                      >
                        $500
                      </button>
                      <button
                        className={`btn ${
                          selectedAmount === 1000 ? "btn-info" : "btn-secondary"
                        }`}
                        onClick={() => handleButtonClick(1000)}
                      >
                        $1000
                      </button>
                    </div>
                  ))}
              </>
            )}
            {autoBidEnabled && (
              <>
                <div className="d-block">
                  {" "}
                  <p className="text-danger">
                    {/* {isNaN(parseFloat(previewAmount))
                      ? previewAmount
                      : `Suggested SET VALUE for BIDBOT i.e $${previewAmount}`} */}
                  </p>
                </div>
                {autoBidDetails?.autobid_active ? (
                  <>
                    {!showUpdateField && (
                      <div
                        className="d-flex justify-content-around align-content-center w-100"
                        style={{ flexWrap: "wrap-reverse" }}
                      >
                        <button
                          onClick={() => {
                            setShowUpdateField(true);
                            setAutoBidValue(autoBidDetails?.max_amount);
                          }}
                          className="advanced-button m-0"
                        >
                          Update 
                        </button>
                        <p
                          className="p-1 m-1 text-dark  text-center"
                          style={{ fontSize: "18px", color: "" }}
                        >
                          BIDBOT Value
                          <span className="">
                            {" "}
                            $ {autoBidDetails?.max_amount}
                          </span>
                        </p>
                      </div>
                    )}
                    {showUpdateField && (
                      <>
                        <div
                          className="d-flex justify-content-around align-content-center w-100"
                          style={{ flexWrap: "wrap-reverse" }}
                        >
                          <button
                            className="advanced-button m-0"
                            onClick={handleAutoBidUpdate}
                            disabled={
                              isNaN(parseFloat(previewAmount)) ||
                              previewAmount != autoBidValue 
                            }
                          >
                            {isAutoBid ? (
                              <>
                                {" "}
                                <Spinner
                                  width={{ width: "10px", height: "10px" }}
                                />
                              </>
                            ) : (
                              <> Update  </>
                            )}
                          </button>
                          <input
                            type="number"
                            className="text-center place-input"
                            placeholder="Set Max Value"
                            value={autoBidValue}
                            onChange={handleAutoBidChange}
                          />
                        </div>
                      </>
                    )}

                    <p className="mt-3">
                      {" "}
                      <Link to="/dashboard/user/Bidding_history">
                        {" "}
                        **You can check
                        <span
                          style={{ textDecoration: "underline" }}
                          className="text-dark"
                        >
                          {" "}
                          Bidding History
                        </span>{" "}
                        Here.
                      </Link>
                    </p>
                  </>
                ) : (
                  <>
                    <div
                      className="d-flex justify-content-around align-content-center w-100 mb-4"
                      style={{ flexWrap: "wrap-reverse" }}
                    >
                      <button
                        className="advanced-button m-0"
                        onClick={handleAutoBid}
                        disabled={
                          isNaN(parseFloat(previewAmount)) ||
                          previewAmount != autoBidValue 
                        }
                      >
                        {isAutoBid ? (
                          <>
                            {" "}
                            <Spinner
                              width={{ width: "10px", height: "10px" }}
                            />
                          </>
                        ) : (
                          <> Set </>
                        )}
                      </button>
                      <input
                        type="number"
                        className="text-center place-input"
                        placeholder="Set Max Value"
                        value={autoBidValue}
                        onChange={handleAutoBidChange}
                      />
                    </div>
                  </>
                )}
              </>
            )}
            {/* <br /> */}
            {auction?.status === "inactive" ||
              (!hasAuctionEnded && (
                <div className="autobid-cont">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="autoBidSwitch"
                      checked={autoBidEnabled}
                      onChange={() => {
                        setAutoBidEnabled(!autoBidEnabled);
                        handleAutoBid();
                        console.log("changing");
                      }}
                    />
                    <label
                      className="form-check-label ml-4"
                      htmlFor="autoBidSwitch"
                    >
                      {autoBidDetails?.autobid_active && autoBidEnabled ? (
                        <>BitBot is Enabled</>
                      ) : (
                        <>Enable BidBot</>
                      )}{" "}
                      <OverlayTrigger
                        placement="right"
                        overlay={
                          <Tooltip>
                            BidBot enables bidders to set a maximum bid for an
                            item in an auction. The system automatically
                            increases their bid by a $50 increment whenever
                            they're outbid, ensuring they remain the highest
                            bidder up to their set maximum, enhancing
                            convenience and competitiveness in online bidding.
                          </Tooltip>
                        }
                      >
                        <span className="ml-2">
                          <i className="fas fa-info-circle text-dark"></i>
                        </span>
                      </OverlayTrigger>
                    </label>
                  </div>
                </div>
              ))}
          </div>
          <div className="head-side-bar">
            <h4>{vehicle_type} Details</h4>
          </div>
          <div className="list-info">
            <ul>
              {auction?.car?.manufacture_company && (
                <li>
                  <span>Make:</span>
                  {auction?.car?.manufacture_company}
                </li>
              )}
              {auction?.car?.manufacture_year && (
                <li>
                  <span>Manufacturing Year:</span>
                  {auction?.car?.manufacture_year}
                </li>
              )}
              {auction?.car?.fuel_type && (
                <li>
                  <span>Fuel Type:</span>
                  {auction?.car?.fuel_type}
                </li>
              )}
              {auction?.car?.color && (
                <li>
                  <span>Color:</span> {auction?.car?.color}
                </li>
              )}
              {auction?.car?.odometer_reading && (
                <li>
                  <span>Odometer:</span>
                  {auction?.car?.odometer_reading}
                </li>
              )}
              {auction?.car?.unique_identification_number && (
                <li>
                  <span>Vin No:</span>
                  {auction?.car?.unique_identification_number}
                </li>
              )}
              {auction?.car?.num_of_cylinders && (
                <li>
                  <span>No of Cylinders</span> {auction?.car?.num_of_cylinders}
                </li>
              )}
              {auction?.car?.transmission_type && (
                <li>
                  <span>Transmission:</span> {auction?.car?.transmission_type}
                </li>
              )}
              {auction?.car?.body_type && (
                <li>
                  <span>Body Type:</span> {auction?.car?.body_type}
                </li>
              )}
              {auction?.car?.vehicle_type === "Truck" && (
                <>
                  {auction?.car?.engine_power && (
                    <li>
                      <span>Engine Power:</span> {auction?.car?.engine_power}
                    </li>
                  )}
                  {auction?.car?.gvm && (
                    <li>
                      <span>GVM:</span> {auction?.car.gvm}
                    </li>
                  )}
                  {auction?.car?.axle_configuration && (
                    <li>
                      <span>Axle Configuration:</span>{" "}
                      {auction?.car?.axle_configuration}
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
);
export default LeftInfo;
