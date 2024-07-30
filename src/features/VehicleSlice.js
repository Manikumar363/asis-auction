import { createSlice } from "@reduxjs/toolkit";

const VehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    isFetching: false,
    isFetchingImage: false,
    isUploadingImage: false,
    error: false,
    errMsg: "",
  },
  reducers: {
    UploadStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    UploadSuccess: (state, action) => {
      state.errMsg = "";
      state.isFetching = false;
      state.error = false;
    },
    UploadFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    UploadImageStart: (state, action) => {
      state.isUploading = true;
      state.error = false;
    },
    UploadImageSuccess: (state, action) => {
      state.errMsg = "";
      state.isUploading = false;
      state.error = false;
    },
    UploadImageFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isUploading = false;
      state.error = true;
    },
    GetCarsStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    GetCarsSuccess: (state, action) => {
      state.errMsg = "";
      state.isFetching = false;
      state.error = false;
    },
    GetCarsFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },
    GetImagesStart: (state, action) => {
      state.isFetchingImage = true;
      state.error = false;
    },
    GetImagesSuccess: (state, action) => {
      state.errMsg = "";
      state.isFetchingImage = false;
      state.error = false;
    },
    GetImagesFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetchingImage = false;
      state.error = true;
    },
  },
});
export const {
  UploadStart,
  UploadSuccess,
  UploadFailure,
  UploadImageFailure,
  UploadImageStart,
  UploadImageSuccess,
  GetCarsSuccess,
  GetCarsFailure,
  GetCarsStart,
  GetImagesSuccess,
  GetImagesFailure,
  GetImagesStart,
} = VehicleSlice.actions;
export default VehicleSlice.reducer;
