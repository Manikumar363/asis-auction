import { createSlice } from "@reduxjs/toolkit";

const BidSlice = createSlice({
  name: "bid",
  initialState: {
    isPlacingBid: false,
    isAutoBid: false,
    error: false,
    errMsg: "",
  },
  reducers: {
    StartBid: (state, action) => {
      state.isPlacingBid = true;
      state.error = false;
    },
    SuccessBid: (state, action) => {
      state.errMsg = "";
      state.isPlacingBid = false;
      state.error = false;
    },
    FailureBid: (state, action) => {
      state.errMsg = action.payload;
      state.isPlacingBid = false;
      state.error = true;
    },
    AutoBidStart: (state, action) => {
      state.isAutoBid = true;
      state.error = false;
    },
    AutoBidSuccess: (state, action) => {
      state.errMsg = "";
      state.isAutoBid = false;
      state.error = false;
    },
    FailureAutoBid: (state, action) => {
      state.errMsg = action.payload;
      state.isAutoBid = false;
      state.error = true;
    },
  },
});
export const {
  SuccessBid,
  FailureBid,
  StartBid,
  FailureAutoBid,
  AutoBidStart,
  AutoBidSuccess,
} = BidSlice.actions;
export default BidSlice.reducer;
