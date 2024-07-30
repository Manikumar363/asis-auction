import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { logOut } from "../features/authSlice";
import { checkislocked } from "../features/apiCall";
import {toast} from 'react-toastify'


const ProtectedRoute = () => {
  const { isFetching, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userEmail}=useSelector((state)=>state.auth)
  const ErrorToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const decodedToken = jwt_decode(token);

        if (decodedToken.exp < Date.now() / 1000) {
          dispatch(logOut());
          navigate("/login");
        }
      } else {
        // Handle the case where there is no token (user not logged in)
        navigate("/login");
      }


    };
    const checkiflocked=async()=>{
      if(token){
        const data=await checkislocked(dispatch,userEmail)
       console.log(data)
      if(data && data.is_locked==true){
        
         dispatch(logOut());
         navigate("/login")
         toast.error("Your account is locked by admin",ErrorToastOptions)
         
      }

      }
      
    }

    checkToken();
    checkiflocked();
  }, [token, navigate, dispatch]);

  if (!token && !isFetching) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
