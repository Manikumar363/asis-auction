import React, { useState } from "react";
import Layout from "../../components/Layout/Layout/Layout";

const SeeStatus = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      bidder: "Bidder 1",
      price: 25000,
      time: "2023-10-12T14:30:00",
    },
    {
      id: 2,
      bidder: "Bidder 2",
      price: 26000,
      time: "2023-10-12T15:00:00",
    },
    // Add more offers as needed
  ]);

  const handleAcceptOffer = (id) => {
    // Logic to accept the offer
  };

  const handleDeclineOffer = (id) => {
    // Logic to decline the offer
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offers-container">
            <h2>Offers from Bidders</h2>
            <table>
              <thead>
                <tr>
                  <th>Bidder</th>
                  <th>Price</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((offer) => (
                  <tr key={offer.id}>
                    <td>{offer.bidder}</td>
                    <td>${offer.price}</td>
                    <td>{new Date(offer.time).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => handleAcceptOffer(offer.id)}
                        className="advanced-button accept"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleDeclineOffer(offer.id)}
                        className="advanced-button reject"
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="left-info" className="col-md-4">
            <div className="details">
              <img
                src="/assets/images/car3.jpg"
                alt="Car Image"
                className="offers-img"
                style={{ width: "100%" }}
              />

              <div className="head-side-bar">
                <h4>Vehicle Details</h4>
              </div>
              <div className="list-info">
                <ul>
                  <li>
                    <span>Make:</span>Audi
                  </li>
                  <li>
                    <span>Fabrication Year:</span>2015-6-17
                  </li>
                  <li>
                    <span>Fuel Type:</span>Gasoline Fuel
                  </li>
                  <li>
                    <span>No. of Gears:</span>5
                  </li>
                  <li>
                    <span>Transmission:</span>Automatic
                  </li>
                  <li>
                    <span>Color:</span>Blue
                  </li>
                  <li>
                    <span>Fuel Economy:</span>12l/City - 10l/hwy
                  </li>
                  <li>
                    <span>Motor Capacity:</span>( 179KW / 400BHP )
                  </li>
                  <li>
                    <span>Country of Origin:</span>Germany ( Munich )
                  </li>
                  <li>
                    <span>Price:</span>$30,000
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SeeStatus;
