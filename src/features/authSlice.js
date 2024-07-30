import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
const token = localStorage.getItem("userToken");
const user = localStorage.getItem("userId");
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");
const userPhoneNumber = localStorage.getItem("userPhoneNumber");
const userAddress = localStorage.getItem("userAddress");
const userCity = localStorage.getItem("userCity");
const userState = localStorage.getItem("userState");
const userSuburb = localStorage.getItem("userSuburb");
const userPostalCode = localStorage.getItem("userPostalCode");
const userAge = localStorage.getItem("userAge");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    userName,
    userEmail,
    userPhoneNumber,
    userAddress,
    userSuburb,
    userAge,
    userCity,
    userState,
    userPostalCode,
    token: token,
    isFetching: false,
    error: false,
    errMsg: "",
  },
  reducers: {
    setVehicleType: (state, action) => {
      state.vehicle_type = action.payload;
    },
    setProfile: (state, action) => {
      // console.log(action);
      state.userName = action.payload?.first_name;
      state.userEmail = action.payload?.email;
      state.userPhoneNumber = action.payload?.phoneNumber;
      state.userAddress = action.payload?.address;
      state.userCity = action.payload.user?.city;
      state.userState = action.payload.user?.state;
      state.userSuburb = action.payload.user?.shuburb;
      state.userPostalCode = action.payload.user?.postal_code;
      state.userAge = action.payload?.age;
    },

    loginStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.errMsg = "";
      state.error = false;
      state.isFetching = false;
      state.error = false;
      state.user = action.payload.user._id;
      state.userName = action.payload.user?.firstname;
      state.userEmail = action.payload.user?.email;
      state.userPhoneNumber = action.payload.user?.phoneNumber;
      state.userAddress = action.payload.user?.address;
      state.userState = action.payload.user?.state;
      state.userSuburb = action.payload.user?.shuburb;
      state.userCity = action.payload.user?.city;
      state.userPostalCode = action.payload.user?.postal_code;
      state.userAge = action.payload.user?.age;
      // state.userRole = action.payload.user?.role;
      state.token = action.payload.token;

      localStorage.setItem("userToken", state.token);
      localStorage.setItem("userId", state.user);
      localStorage.setItem("userName", state.userName);
      localStorage.setItem("userEmail", state.userEmail);
      localStorage.setItem("userPhoneNumber", state.userPhoneNumber);
      localStorage.setItem("userAddress", state.userAddress);
      localStorage.setItem("userSuburb", state.userSuburb);
      localStorage.setItem("userPostalCode", state.userPostalCode);
      localStorage.setItem("userState", state.userState);
      localStorage.setItem("userCity", state.userCity);
      localStorage.setItem("userAge", state.userAge);
    },
    loginFailure: (state, action) => {
      state.errMsg = action.payload;
      state.isFetching = false;
      state.error = true;
    },

    registerStart: (state, action) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.error = false;
      state.errMsg = "";
      state.isFetching = false;
      state.user = action.payload.user._id;
      state.userName = action.payload.user?.name;
      state.userEmail = action.payload.user?.email;
      state.userPhoneNumber = action.payload.user?.phoneNumber;
      state.userAddress = action.payload.user?.address;
      state.userCity = action.payload.user?.city;
      state.userState = action.payload.user?.state;
      state.userSuburb = action.payload.user?.shuburb;
      state.userPostalCode = action.payload.user?.postal_code;
      state.userAge = action.payload.user?.age;

      state.token = action.payload.token;

      localStorage.setItem("userToken", state.token);
      localStorage.setItem("userId", state.user);
      localStorage.setItem("userName", state.userName);
      localStorage.setItem("userEmail", state.userEmail);
      localStorage.setItem("userPhoneNumber", state.userPhoneNumber);
      localStorage.setItem("userAddress", state.userAddress);
      localStorage.setItem("userPostalCode", state.userPostalCode);
      localStorage.setItem("userState", state.userState);
      localStorage.setItem("userSuburb", state.userSuburb);
      localStorage.setItem("userCity", state.userCity);
      localStorage.setItem("userAge", state.userAge);
    },
    registerFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.errMsg = action.payload;
    },

    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("userToken");
    },
  },
});

export const {
  setProfile,
  logOut,
  loginStart,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerStart,
  registerFailure,
  setVehicleType,
} = authSlice.actions;
export default authSlice.reducer;
