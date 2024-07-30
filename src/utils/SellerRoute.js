// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Navigate, Outlet, useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import { logOut } from "../features/authSlice";
// import { Spinner } from "react-bootstrap";

// const SellerRoute = () => {
//   const { isFetching, token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkToken = async () => {
//       if (token) {
//         const decodedToken = jwt_decode(token);
//         if (decodedToken.exp < Date.now() / 1000) {
//           dispatch(logOut());
//           navigate("/login");
//         }
//       } else {
//         // Handle the case where there is no token (user not logged in)
//         navigate("/login");
//       }
//     };

//     checkToken();
//   }, [token, navigate, dispatch]);

//   if (!token || isFetching) {
//     // Show loading spinner while fetching data
//     return <Spinner animation="border" />;
//   }

//   return <Outlet />;
// };

// export default SellerRoute;
