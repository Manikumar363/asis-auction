import React from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import PaymentMethod from "../../components/PaymentMethod";
import Timer from "../../components/Timer";
const AuctionVehicleDetailTable = ({
  auction,

  timer,
  formatData,
  handleConfirmationYes,
  handleContact,
}) => {
  const { isFetching } = useSelector((state) => state.vehicle);
  return (
    <Table striped bordered hover id="auction-detail-container">
      <tbody>
        <tr>
          <td className="table-column-name">Auction ID</td>
          <td>{auction?.auction_id}</td>
        </tr>
        <tr>
          <td className="table-column-name">Auction Status</td>
          <td>
            {isFetching ? (
              <div className="loading-container">
                <Spinner animation="border" variant="dark" />
              </div>
            ) : (
              <>
                {auction?.status === "refunded" ? (
                  <>
                    {" "}
                    <span className="text-danger font-weight-bold">
                      AMOUNT REFUNDED
                    </span>{" "}
                  </>
                ) : (
                  <>
                    {auction?.status === "closed" ? (
                      <>
                        <span className="text-danger font-weight-bold">
                          AUCTION ENDED
                        </span>
                      </>
                    ) : (
                      <>
                        {auction?.status === "inactive" ? (
                          <>
                            <span className="text-info font-weight-bold">
                              AUCTION NOT STARTED
                              <Timer timer={timer} status={auction?.status} />
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-success font-weight-bold">
                              AUCTION LIVE/ONGOING
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </td>
        </tr>
        {auction?.status === "closed" && (
          <tr>
            <td className="table-column-name">Ended on</td>
            <td> {formatData(auction?.auction_end)}</td>
          </tr>
        )}
        <tr>
          <td className="table-column-name">Current Status</td>
          <td>
            <span
              className="table-column-name text-secondary "
              style={{ fontSize: "13px " }}
            >
              {auction?.reserve_flag}
            </span>
            <br />{" "}
            {auction?.is_Seller_paid10_percent ? (
              <>
                {auction?.is_Seller_paid10_percent &&
                auction?.is_Winner_paid10_percent ? (
                  <span>
                    You both have paid the Token Amount! You can contact buyer{" "}
                  </span>
                ) : (
                  <>
                    {" "}
                    <span>You have paid the token amount.</span>
                  </>
                )}
              </>
            ) : (
              <>
                {" "}
                {auction?.auction_confirmed && (
                  <>Confirmation Sent to the Buyer!</>
                )}
              </>
            )}
          </td>
        </tr>
        <tr>
          <td className="table-column-name">Highest Bid</td>
          <td>
            {auction?.highest_bid == 0 ? (
              <>We are sorry to inform no bids are placed</>
            ) : (
              auction?.highest_bid
            )}
          </td>
        </tr>{" "}
        {auction?.status != "inactive" && (
          <tr>
            <td className="table-column-name">
              {auction?.is_Seller_paid10_percent ? (
                <>Buyer Details</>
              ) : (
                <>To do Status</>
              )}
            </td>
            <td>
              {auction?.highest_bid > 0 ? (
                <>
                  {!auction?.auction_confirmed ? (
                    <button
                      onClick={() => {
                        handleConfirmationYes();
                      }}
                      className="advanced-button w-25 mt-0"
                    >
                      Confirm Buyer
                    </button>
                  ) : (
                    <>
                      {auction?.is_Seller_paid10_percent ? (
                        <>
                          <Button
                            className="mt-0"
                            onClick={() => {
                              handleContact(
                                auction?._id
                                // auction?.is_Seller_paid10_percent,
                                // auction?.is_Winner_paid10_percent
                              );
                            }}
                          >
                            Contact Buyer
                          </Button>
                        </>
                      ) : (
                        <>
                          <p>Pay 10% to see Contact Details</p>
                          <PaymentMethod auctionId={auction?._id} />

                          <p>
                            Note: If you have Paid the amount ! Kindly wait for
                            some time.We will Mail you Simultaneously
                          </p>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <>
                  {auction?.status == "refunded" ||
                  auction?.status == "closed" ? (
                    <>Auction is Closed </>
                  ) : (
                    <>Wait for Bids</>
                  )}
                </>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default AuctionVehicleDetailTable;
