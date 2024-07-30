import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "../utils/axios";

// import "dotenv/config";

const PaymentMethod = ({ auctionId }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const toastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const createOrder = async () => {
    try {
      const { data } = await axios.post(
        "/api/order/create-auction-order",
        {
          auctionId: auctionId,
        },
        { headers: { Authorization: token } }
      );

      return data.order.id;
    } catch (error) {
      toast.error("Something went wrong. Please try again!", toastOptions);
      // show toast for Something went wrong.
    }
  };

  const onApprove = async (data) => {
    try {
      const { data: onApproveData } = await axios.post(
        `/api/order/capture-payment/${data.orderID}`,
        {
          auctionId: auctionId,
        },
        { headers: { Authorization: token } }
      );

      if (onApproveData.paymentCaptured.status === "COMPLETED") {
        window.scroll(0, 0);
        navigate("/dashboard/user/get-auction-status", { replace: true });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!", toastOptions);
      // show toast for Something went wrong.
    }
  };

  return (
    <>
      <PayPalScriptProvider
        options={{
          clientId:
            "AZcz3fVpEEknrTsen9b06ZFtpz5Q4Ns8A5v9rf5UdhNoWzBt6vxduc16Q5MihIB1uGbpafL8kv61XxX4", // Use process.env to access environment variables
          currency: "AUD",
          components: "buttons,hosted-fields",
        }}
      >
        <div className=" m-3 w-50 m-auto">
          {/* <h2>Amount $ {(10 * bidAmount) / 100} </h2>
          <p> Pay Amount to see Contact Details</p> */}
          <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
            className="text-align-center"
          />
        </div>
      </PayPalScriptProvider>

      <ToastContainer />
    </>
  );
};

export default PaymentMethod;
