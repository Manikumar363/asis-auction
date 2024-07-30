import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/VehicleComponent.css";

const VehicleComponent = ({
  imageSrc,
  title,
  price,
  description,
  auctionId,
  carId,
  rating,
  fuelType,
  odometerReading,
  cityLocation,
  status,
}) => {
  const navigate = useNavigate();
  console.log(status);
  const handleViewDetail = () => {
    navigate(`/auction/${auctionId}`, { carId: { carId } });
  };

  return (
    <div className="featured-item">
      <div className="status-tooltip">
        <div
          className={`status-popup ${
            status == "active"
              ? "Ongoing"
              : status === "inactive"
              ? "NotStarted"
              : "Closed"
          }`}
        >
          {status == "active"
            ? "Ongoing "
            : status === "inactive"
            ? "Not Started"
            : "Closed"}
        </div>
      </div>

      <img src={imageSrc} alt="" />
      <div className="right-content">
        <Link
          to={`/auction/${auctionId}`}
          state={{ carId }}
          style={{
            backgroundColor: "transparent",
            border: "0px",
            padding: "0px",
            width: "auto",
          }}
        >
          <h2>{title}</h2>
        </Link>
        <Link to={`/auction/${auctionId}`} state={{ carId }}>
          <span>{price == 0 ? <>No Bids</> : <>$ {price}</>}</span>
          <div className="light-line" />
          <p className="description">{description}</p>
          <div className="view-details">
            <Link to={`/auction/${auctionId}`} state={{ carId }}>
              View Details
            </Link>
          </div>
          <div className="item-rate text-right d-none">
            <ul>
              {[...Array(rating).keys()].map((index) => (
                <li key={index}>
                  <i className="fa fa-star" />
                </li>
              ))}
              {[...Array(5 - rating).keys()].map((index) => (
                <li key={index}>
                  <i className="fa fa-star-o" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
          <div className="car-info">
            <ul>
              {fuelType && (
                <li>
                  <i className="fa-solid fa-gas-pump" /> {fuelType}
                </li>
              )}
              {odometerReading && (
                <li>
                  <i class="fas fa-tachometer-alt" />
                  {odometerReading}
                </li>
              )}
              {cityLocation && (
                <li>
                  <i className="fa-solid fa-city" /> {cityLocation}
                </li>
              )}
            </ul>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VehicleComponent;
