// RightDiv.js
import React from "react";

const RightInfo = ({ activeTab, handleTabClick, vehicleType, auction }) => {
  const carState = auction?.car?.car_state;
  const statePCInfo = auction?.car?.car_postal_code;
  const stateSuburbInfo = auction?.car?.car_shuburb;
  return (
    <div className="tab tab-links-mobile">
      <div className="tabs">
        <ul className="tab-links">
          {/* Add your tab links here */}
          <li className={activeTab === "tab2" ? "active" : ""}>
            <a onClick={() => handleTabClick("tab2")}>Description</a>
          </li>
          <li className={activeTab === "tab3" ? "active" : ""}>
            <a onClick={() => handleTabClick("tab3")}>{vehicleType} Location</a>
          </li>
        </ul>
        <div className="tab-content">
          {/* Add your tab content here */}
          {/* For example, the content of tab2 */}
          <div
            id="tab2"
            className={`tab-links-mobile tab ${
              activeTab === "tab2" ? "active" : ""
            }`}
          >
            <p>{auction?.car?.description}</p>
          </div>
          {/* For tab3, displaying state and suburb information */}
          <div
            id="tab3"
            className={`tab ${activeTab === "tab3" ? "active" : ""} location `}
          >
            <p>
              State:<span> {carState}</span>
            </p>
            <p>
              Suburb:<span>{stateSuburbInfo}</span>{" "}
            </p>
            <p>
              Postal Code:<span> {statePCInfo}</span>
            </p>
          </div>
          {/* Repeat the pattern for other tabs */}
        </div>
      </div>
    </div>
  );
};

export default RightInfo;
