import { configureStore } from "@reduxjs/toolkit";

import auctionReducer from "./AuctionSlice";
import authReducer from "./authSlice";
import bidReducer from "./BidSlice";
import vehicleReducer from "./VehicleSlice.js";

export default configureStore({
  reducer: {
    auth: authReducer,
    bid: bidReducer,
    vehicle: vehicleReducer,
    auction: auctionReducer,
  },
});
