import React from "react";
import "../styles/CarProductCard.css";

const CarCard = ({
  imgSrc,
  carModel = "test",
  highestBid = "test",
  desc = "test",
  fuel = "test",
  transmission_type = "test",
  odometer = "test",
  cylinders = "test",
  isUpcoming = "test",
  status = "Ongoing",
  date,
}) => {
  return (
    <>
      {status === "Ongoing" && (
        <div className="card dzire-card">
          <div className="img-wrapper">
            <img src={imgSrc} className="card-img-top" alt="" />
          </div>
          {!isUpcoming && <div className="status-badge">{status}</div>}
          <div className="card-body">
            <h5 className="card-title" style={{ textAlign: "left" }}>
              {carModel}
            </h5>
            <div className="current-bid">Current Bid: {highestBid}$</div>
            <div className="car-desc" style={{ textAlign: "left" }}>
              {desc}
            </div>
            <div className="car-details">
              <span className="badge badge-primary">{fuel}</span>
              <span className="badge badge-secondary">{transmission_type}</span>
              <span className="badge badge-info">{odometer}kms</span>
              <span className="badge badge-dark">{cylinders} cylinders</span>
            </div>
          </div>
        </div>
      )}
      {status === "Closed" && (
        <div className="card dzire-card">
          <div className="img-wrapper">
            <img src={imgSrc} className="card-img-top" alt="" />
          </div>
          {!isUpcoming && (
            <div
              className="status-badge"
              style={{ backgroundColor: "#ffe5e5", color: "#e30000" }}
            >
              Ended
            </div>
          )}
          <div className="card-body">
            <h5 className="card-title" style={{ textAlign: "left" }}>
              {carModel}
            </h5>
            {status === 'Closed' ? (<div className="current-bid" >Ended on : {highestBid}$</div>):(<div className="current-bid">Current Bid: {highestBid}$</div>)}
             {/* <div className="current-bid">Current Bid: {highestBid}$</div> */}
            <div className="car-desc" style={{ textAlign: "left" }}>
              {desc}
            </div>
            <div className="car-details">
              <span className="badge badge-primary">{fuel}</span>
              <span className="badge badge-secondary">{transmission_type}</span>
              <span className="badge badge-info">{odometer}kms</span>
              <span className="badge badge-dark">{cylinders} cylinders</span>
            </div>
          </div>
        </div>
      )}
      {status === "Upcoming" && (
        <div className="card dzire-card">
          <div className="img-wrapper">
            <img src={imgSrc} className="card-img-top" alt="" />
          </div>

          <div className="status-badge">Upcoming</div>

          <div className="card-body">
            <h5 className="card-title" style={{ textAlign: "left" }}>
              {carModel}
            </h5>
            <div className="current-bid">Starting at {date}</div>
            <div className="car-desc" style={{ textAlign: "left" }}>
              {desc}
            </div>
            <div className="car-details">
              <span className="badge badge-primary">{fuel}</span>
              <span className="badge badge-secondary">{transmission_type}</span>
              <span className="badge badge-info">{odometer}kms</span>
              <span className="badge badge-dark">{cylinders} cylinders</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CarCard;
