import React from "react";
import { NavLink } from "react-router-dom";
const SellerMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <NavLink
            to="/dashboard/user/show-cars"
            className="list-group-item list-group-item-action"
          >
            Your Vehicles
          </NavLink>
          <NavLink
            to="/dashboard/user/upload-product"
            className="list-group-item list-group-item-action"
          >
            Upload your Vehicle
          </NavLink>
          <NavLink
            to="/dashboard/user/show-cars"
            className="list-group-item list-group-item-action"
          >
            Create Auction
          </NavLink>
          <NavLink
            to="/dashboard/user/get-auction-status"
            className="list-group-item list-group-item-action"
          >
            See Auction Status
          </NavLink>
          <NavLink
            to="/dashboard/user/history"
            className="list-group-item list-group-item-action"
          >
            Sold History
          </NavLink>{" "}
          <NavLink
            to="/dashboard/user/transaction-history"
            className="list-group-item list-group-item-action"
          >
            Transaction History
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SellerMenu;
