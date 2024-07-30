import { toast } from "react-toastify";
import axios from "../utils/axios.js";
import { parseError } from "../utils/parseError.js";

import {
  GetAuctionsFailure,
  GetAuctionsStart,
  GetAuctionsSuccess,
} from "./AuctionSlice.js";
import {
  AutoBidStart,
  AutoBidSuccess,
  FailureAutoBid,
  FailureBid,
  StartBid,
  SuccessBid,
} from "./BidSlice.js";
import { UploadFailure, UploadStart, UploadSuccess } from "./VehicleSlice.js";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./authSlice.js";

const ErrorToastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
const successToastOptions = {
  position: "top-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};
export const login = async (dispatch, user) => {
  dispatch(loginStart());

  const { email, password } = user;

  try {
    const { data } = await axios.post("/api/user/login", { email, password });

    dispatch(loginSuccess(data));
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(loginFailure(errorMessage));
  }
};
export const checkislocked=async(dispatch,email)=>{
  const token = localStorage.getItem("userToken");
  try{
    const {data}=await axios.post("/api/user/check-status",{email}, { headers: { Authorization: `${token}` } })
    return data
  }
  catch(error){
    console.log(error)
    return {is_locked:false}
  }
}

export const verifyOtp = async (phone, code) => {
  try {
       const result = await axios.post("/api/user/verify-otp", { phone, code });
     console.log(result,'result check otp verify');
    return result
  } catch (error) {
    // console.log(error);
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return false;
  }
};
export const getOtp = async (phone) => {
  try {
    await axios.post("/api/user/send-otp", { phone });
    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return error;
  }
};
export const register = async (dispatch, user) => {
  dispatch(registerStart());

  const {
    firstName,
    middleName,
    lastName,
    dob,
    licenceState,
    licenceNumber,
    cardNumberBack,
    email,
    password,
    age,
    phoneNumber,
    address,
    city,
    state,
    postal_code,
    shuburb,
    document,
    passportnumber,
  } = user;

  try {
    // alert("hi");

    const {data} = await axios.post("/api/user/register", {
      firstname: firstName,
      middlename: middleName,
      lastname: lastName,
      dob: dob,
      licence_state: licenceState,
      licencenumber: licenceNumber,
      cardnumberback: cardNumberBack,
      email,
      password: password,
      age: 49,
      phone: phoneNumber,
      address,
      city,
      state,
      postal_code,
      shuburb: shuburb,
      document: document,
      passportnumber: passportnumber,
    });

    toast.success(data.message, successToastOptions);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerFailure(error));
    // alert(JSON.stringify(error))
    toast.error(error?.message, ErrorToastOptions);
  }
};
export const UploadProducts = async (dispatch, formData) => {
  const token = localStorage.getItem("userToken");
  dispatch(UploadStart());
  // console.log(formData.vehicle_type);

  try {
    const { data } = await axios.post(
      "/api/car/upload-car-details",
      formData, // Assuming formData is a JSON object
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );

    dispatch(UploadSuccess(data));
    toast.success("Uploaded!", successToastOptions);
    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(UploadFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return false;
  }
};

export const placebid = async (dispatch, data) => {
  const token = localStorage.getItem("userToken");
  dispatch(StartBid());
  const { bid_amount, auctionId } = data;
  try {
    const { data } = await axios.post(
      `/api/bidding/create-bid/${auctionId}`,
      { bid_amount },
      { headers: { Authorization: `${token}` } }
    );
    toast.success("Bid Placed!", successToastOptions);
    dispatch(SuccessBid(data));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(FailureBid(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return false;
  }
};
export const autobid = async (dispatch, data) => {
  const token = localStorage.getItem("userToken");
  dispatch(AutoBidStart());
  const { autoBidValue, auctionId, setAutoBidEnabled, autoBidEnabled } = data;
  try {
    console.log(autoBidEnabled,"testing at laten night")
    const { data } = await axios.post(
      `/api/auto-bid/on-off-autobid/${auctionId}`,
      { max_amount: autoBidValue, increment_amount: 50},
      { headers: { Authorization: `${token}` } }
    );
    toast.success(data.message, successToastOptions);
    dispatch(AutoBidSuccess(data));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(FailureAutoBid(errorMessage));
    console.log("here is big error")
    // setAutoBidEnabled(true);
    toast.error(errorMessage, ErrorToastOptions);
    return false;
  }
};
export const updateAutobid = async (dispatch, data) => {
  const token = localStorage.getItem("userToken");
  dispatch(AutoBidStart());
  const { autoBidValue, auctionId } = data;
  try {
    const { data } = await axios.post(
      `/api/auto-bid/update-auto-bid/${auctionId}`,
      { max_amount: autoBidValue, increment_amount: 50 },
      { headers: { Authorization: `${token}` } }
    );
    console.log(data);
    toast.success("AutoBID Started!", successToastOptions);
    dispatch(AutoBidSuccess(data));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(FailureAutoBid(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return false;
  }
};
export const executeWhenBid = async (dispatch, data) => {
  const token = localStorage.getItem("userToken");
  const { auctionId } = data;
  try {
    console.log("helllo i m running");

    const { data } = await axios.post(`/api/auto-bid/bid/${auctionId}`, {
      headers: { Authorization: `${token}` },
    });

    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    toast.error(errorMessage, ErrorToastOptions);
    return false;
  }
};

export const sendQuery = async (dispatch, data) => {
  dispatch(StartBid());
  const { name, email, phone, message } = data;

  try {
    await axios.post(
      "/api/query/submit-query",
      {
        name,
        email,
        phone,
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Submitted Query!", successToastOptions);
    dispatch(SuccessBid(data));
    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(FailureBid(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return false;
  }
};

// export const createAuction = async (dispatch, data) => {
//   const token = localStorage.getItem("userToken");

//   dispatch(UploadStart());
//   const {
//     auction_start_date,
//     auction_start_time,
//     auction_end_date,
//     auction_end_time,
//     seller_type,
//     company_name,
//     show_hide_price,
//     asking_price,
//     abn,
//     carId,
//   } = data;

//   try {
//     const { data } = await axios.post(
//       `/api/auction/create-auction/${carId}`,
//       {
//         auction_start_date,
//         auction_start_time,
//         auction_end_date,
//         auction_end_time,
//         seller_type,
//         company_name,
//         show_hide_price,
//         asking_price,
//         abn,
//       },
//       { headers: { Authorization: `${token}` } }
//     );
//     dispatch(UploadSuccess(data));
//     // Navigate("/dashboard/user/get-auction-status");
//     toast.success("Auction is Created!", successToastOptions);
//   } catch (error) {
//     const errorMessage = parseError(error);
//     dispatch(UploadFailure(errorMessage));
//     toast.error(errorMessage, ErrorToastOptions);
//   }
// };
export const createAuction = async (dispatch, data) => {
  const token = localStorage.getItem("userToken");

  dispatch(UploadStart());
  const {
    auction_start_date,
    auction_start_time,
    auction_end_date,
    auction_end_time,
    seller_type,
    company_name,
    show_hide_price,
    asking_price,
    abn,
    carId,
  } = data;

  try {
    const timezoneOffset = new Date().getTimezoneOffset();
    // console.log(timezoneOffset);
    const { data } = await axios.post(
      `/api/auction/create-auction/${carId}`,
      {
        auction_start_date,
        auction_start_time,
        auction_end_date,
        auction_end_time,
        seller_type,
        company_name,
        show_hide_price,
        asking_price,
        abn,
        timezoneOffset, // Include timezone offset in the request
      },
      { headers: { Authorization: `${token}` } }
    );

    dispatch(UploadSuccess(data));
    // Navigate("/dashboard/user/get-auction-status");
    toast.success("Auction is Created!", successToastOptions);
    return true;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(UploadFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
    return false;
  }
};

export const GetAuctions = async (dispatch, data) => {
  dispatch(GetAuctionsStart());
  const token = localStorage.getItem("userToken");
  const {
    selectedYear,

    selectedModel,
    selectedState,
    selectedManufacturer,

    selectedStatus,
    search,
    currentPage,
    pageSize,
    vehicle_type,
  } = data;

  try {
    const filterParams = {
      manufacture_year: selectedYear,
      model: search || selectedModel,
      vehicle_type,
      car_state: selectedState,
      manufacture_company: selectedManufacturer,
      // transmission_type: selectedTransmission,
      status: selectedStatus,

      // fuel_type: selectedFuel,
      // drive_type: selectedDrive_type,
    };

    // Remove empty filter parameters
    Object.keys(filterParams).forEach((key) => {
      if (!filterParams[key]) {
        delete filterParams[key];
      }
    });

    const params = {
      currentPage,
      resultPerPage: pageSize,
      ...filterParams,
      vehicle_type,
    };

    const { data } = await axios.get("/api/auction/get-all-auctions", {
      params,
      headers: { Authorization: token },
    });

    dispatch(GetAuctionsSuccess(data));
    return data;
  } catch (error) {
    const errorMessage = parseError(error);
    dispatch(GetAuctionsFailure(errorMessage));
    toast.error(errorMessage, ErrorToastOptions);
  }
};
