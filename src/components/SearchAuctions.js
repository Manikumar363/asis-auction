import React, { useEffect, useState } from "react";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetAuctions } from "../features/apiCall";
import Layout from "./Layout/Layout/Layout";
import FeaturedItem from "./VehicleComponent";

const SearchAuctions = () => {
  const { search } = useParams();
  const [selectedModel, setSelectedModel] = useState("");
  const { isFetching } = useSelector((state) => state.auction);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await GetAuctions(dispatch, {
          search,
          currentPage,
          pageSize,
        });

        // Assuming the fetchedData is an object with a property 'auctions' containing an array
        if (Array.isArray(fetchedData.auctions)) {
          setAuctions(fetchedData.auctions);
        } else {
          // Handle other data types if necessary
          // console.error(
          //   "Invalid data structure: auctions array not found in the response"
          // );
        }
      } catch (error) {
        // Handle errors if necessary
        // console.error("Error fetching auctions:", error);
      }
    };
    fetchData(); // Call the async function inside useEffect
  }, [search, currentPage, pageSize]); // Dependency array ensures useEffect runs when these values change

  return (
    <Layout>
      <section className="container listing-page">
        {isFetching ? (
          <h2 className="text-center m-3">Searching Results ...</h2>
        ) : auctions.length > 0 ? (
          <>
            <h4 className="text-center m-3 text-success">We have Found ...</h4>
          </>
        ) : (
          <>
            <h4 className="text-center m-3 text-danger">Not Found ...</h4>
          </>
        )}
        <div className="m-auto row w-75 m-3">
          <div id="listing-cars">
            <ReactPlaceholder
              type="text"
              color="#F0F0F0"
              showLoadingAnimation
              rows={5}
              style={{ width: "80%" }}
              ready={!isFetching}
            >
              {auctions.map((auction, index) => (
                <FeaturedItem
                  // key={index}
                  id={auction?._id}
                  imageSrc={
                    auction?.car.images[0] || "/assets/images/noimage.jpeg"
                  }
                  title={auction?.car.model}
                  price={auction?.highest_bid}
                  description={auction?.car.description}
                  auctionId={auction?._id}
                  rating={4}
                  fuelType={auction?.car.fuel_type}
                  mileage={auction?.car.odometer_reading}
                  carType={auction?.car?.car_city}
                  status={auction?.status}
                />
              ))}
            </ReactPlaceholder>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SearchAuctions;
