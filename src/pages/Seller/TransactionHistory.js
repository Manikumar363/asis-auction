import React, { useEffect, useState } from "react";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import SellerLayout from "../../components/Layout/Layout/SellerLayout";
import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
} from "../../features/VehicleSlice";
import axios from "../../utils/axios";

const TransactionHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.vehicle);
  const [transactions, set_transactions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetCarsStart());
      try {
        const { data } = await axios.get("/api/user/get-transactions", {
          headers: { Authorization: token },
        });
        set_transactions(data.transactions);
        dispatch(GetCarsSuccess(data));
      } catch (error) {
        dispatch(GetCarsFailure("Failed to fetch transactions"));
      }
    };

    fetchData();
  }, [dispatch, token]);

  return (
    <SellerLayout>
      <h3>Transaction History</h3>
      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <ReactPlaceholder
          type="text"
          color="#F0F0F0"
          showLoadingAnimation
          rows={5}
          style={{ width: "80%" }}
          ready={!isFetching}
        >
          <div
            style={{
              height: "40vh",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "dark",
              overflow: "-moz-scrollbars-vertical",
            }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>VIN No </th>
                  <th>Model</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Transaction Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions && transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td>123362376244625348</td>
                      {/* <td>{transaction.order.auction?.car._id}</td> */}
                      <td>hu</td>
                      <td>$ {transaction.amount}</td>
                      <td>{transaction.status}</td>
                      <td>
                        {new Date(transaction.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No transactions available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ReactPlaceholder>
      </div>
    </SellerLayout>
  );
};

export default TransactionHistory;
