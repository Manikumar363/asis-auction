import { createSlice } from "@reduxjs/toolkit";

const AuctionSlice = createSlice({
  name: "auction",
  initialState: {
    isFetching: false,
    error: false,
    errMsg: "",
  },
  reducers: {
    GetAuctionsStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    GetAuctionsSuccess: (state, action) => {
      state.errMsg = "";
      state.isFetching = false;
      state.error = false;
    },
    GetAuctionsFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
  },
});
export const { GetAuctionsStart, GetAuctionsSuccess, GetAuctionsFailure } =
  AuctionSlice.actions;
export default AuctionSlice.reducer;
