import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <NavLink
            to="/dashboard/user"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/update-password"
            className="list-group-item list-group-item-action"
          >
            Update Password
          </NavLink>
          <NavLink
            to="/dashboard/user/auctions_won"
            className="list-group-item list-group-item-action"
          >
            Auctions Won
          </NavLink>
          <NavLink
            to="/dashboard/user/Bidding_history"
            className="list-group-item list-group-item-action"
          >
            Auction Bidding History
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
