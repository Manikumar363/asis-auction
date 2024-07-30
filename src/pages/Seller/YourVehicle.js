import React, { useEffect, useState } from "react";
import { NavLink, Spinner } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SellerLayout from "../../components/Layout/Layout/SellerLayout";
import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
} from "../../features/VehicleSlice.js";
import axios from "../../utils/axios";
import { parseError } from "../../utils/parseError";
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
const YourVehicle = () => {
  const [selectedVehicleType, setSelectedVehicleType] = useState("all"); // "all", "car", "truck"

  const { isFetching } = useSelector((state) => state.vehicle);
  const { token } = useSelector((state) => state.auth);
  const [cars, setCars] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleVehicleTypeChange = (type) => {
    setSelectedVehicleType(type);
  };
  useEffect(() => {
    const fetchData = async () => {
      dispatch(GetCarsStart());
      try {
        const { data } = await axios.get("/api/user/get-all-user-cars", {
          headers: { Authorization: token },
        });
        // console.log(data);
        setCars(data.cars);
        dispatch(GetCarsSuccess(data)); // Dispatch the action with the fetched data
      } catch (error) {
        dispatch(GetCarsFailure("Failed to fetch cars"));
        // Dispatch the action with the error message
      }
    };
    fetchData(); // Call the fetch data function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs once after the initial render
  const handleViewClick = (carId) => {
    navigate(`/dashboard/user/car/${carId}`);
  };
  const handleCreateAuction = (carId) => {
    navigate(`/dashboard/user/create-auction/${carId}`);
  };
  const handleEditClick = async (carId) => {
    navigate(`/dashboard/user/edit-car-details/${carId}`);
  };
  const handleDeleteCar = async (carId) => {
    // console.log(carId);
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (isConfirmed) {
      try {
        const { data } = await axios.delete(`/api/car/delete-car/${carId}`, {
          headers: { Authorization: token },
        });
        // Update the state with the new car list
        const updatedCars = cars.filter((car) => car._id !== carId);
        setCars(updatedCars);

        // Dispatch the action with the fetched data
        dispatch(GetCarsSuccess(data));
        toast.success("Deleted Sucessfully !",successToastOptions);
      } catch (error) {
        const errorMessage = parseError(error);
        toast.error(errorMessage, ErrorToastOptions);
        dispatch(GetCarsFailure("Failed to fetch cars"));
        // Dispatch the action with the error message
      }
    }
  };

  const handleupload = () => {
    navigate("/dashboard/user/upload-product");
  };
  return (
    <SellerLayout>
      <h3>Your Vehicles</h3>
      <div className="container ">
        <div className="row" style={{ marginTop: "20px" }}>
          <div className="col-md-12">
            {isFetching ? (
              <div className="text-center">
                <Spinner />
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center">
                <p>
                  No Vehicle is uploaded. Upload a vehicle to create an
                  auction?.
                </p>

                <button className="btn btn-primary" onClick={handleupload}>
                  Upload Vehicle
                </button>
              </div>
            ) : (
              <ReactPlaceholder
                type="text"
                color="#F0F0F0"
                showLoadingAnimation
                rows={5}
                style={{ width: "80%" }}
                ready={!isFetching}
              >
                <div className="d-flex w-25 m-auto justify-content-center vehicle_type_container mb-3">
                  <div
                    className={`vehicle_type_truck m-0 vehicle ${
                      selectedVehicleType === "Truck" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id="truckRadio"
                      name="vehicleType"
                      className="d-none"
                      
                      checked={selectedVehicleType === "Truck"}
                      onChange={() => handleVehicleTypeChange("Truck")}
                    />
                    <label htmlFor="truckRadio" className="m-0">
                      <span className=" ">
                        <i className="fas fa-truck " />
                        <br />
                        <p className="d-inline " style={{ fontWeight: "10px" }}>
                          Heavy-weight
                        </p>
                      </span>
                    </label>
                  </div>
                  <div
                    className={`vehicle_type_car m-0 vehicle ${
                      selectedVehicleType === "Car" ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      id="carRadio"
                      name="vehicleType"
                      className="d-none "
                      checked={selectedVehicleType === "Car"}
                      onChange={() => handleVehicleTypeChange("Car")}
                    />
                    <label htmlFor="carRadio" className="m-0">
                      <span className="">
                        <i className="fas fa-car" />
                        <br />
                        <p className="d-inline " style={{ fontWeight: "10px" }}>
                          Light-weight
                        </p>
                      </span>
                    </label>
                  </div>
                  {/* Add a button to show all vehicles */}
                  {/* <button
                    className={`btn btn-link ${
                      selectedVehicleType === "all" ? "selected" : ""
                    }`}
                    onClick={() => handleVehicleTypeChange("all")}
                  >
                    Show All
                  </button> */}
                </div>
                <div
                  style={{
                    height: "53vh",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                    scrollbarColor: "dark",
                    overflow: "-moz-scrollbars-vertical",
                  }}
                >
                  {cars
                    .filter((car) => {
                      if (selectedVehicleType === "all") {
                        return true; // Show all vehicles
                      } else {
                        return car.vehicle_type === selectedVehicleType;
                      }
                    })
                    .map((car, index) => (
                      <ul key={index} className="newest-auction">
                        <li>
                          <img src={car.images[0]} alt="" />
                          <div className="info">
                            <h1 className="title">{car.model}</h1>
                            <NavLink
                              onClick={() => handleViewClick(car._id)}
                              className="text view-detail-button"
                              style={{
                                fontWeight: "bold",
                                color: "black",
                              }}
                            >
                              View Details
                            </NavLink>
                            <NavLink
                              className="price"
                              onClick={() => handleEditClick(car._id)}
                              style={{display:"flex",alignItems:"center",gap:"6px"}}
                            >
                              <i className="fas fa-edit " style={{fontSize:"medium"}}></i>
                              <p style={{fontSize:"small",margin:"0px"}}>
                              <span className="font-red-thunderbird">Edit</span>
                            </p>
                            </NavLink>
                           

                            <ul
                              className="d-flex justify-content-between"
                              style={{
                                backgroundColor: "transparent",
                                textAlign: "end",
                              }}
                            >
                              {car.isAuction_created ? (
                                <>
                                  {" "}
                                  <NavLink
                                    className="your-cars-buttons already_created text-center"
                                    
                                  >
                                    Auction Created
                                  </NavLink>
                                </>
                              ) : (
                                <NavLink
                                  className="your-cars-buttons to_create text-center"
                                  style={{ width: 100 }}
                                  onClick={() => handleCreateAuction(car._id)}
                                >
                                  Create Auction
                                </NavLink>
                              )}
                              {car.isAuction_created ? (
                                <>
                                  {" "}
                                  <NavLink
                                    className="price"
                                    style={{ width: 25,display:"flex",flexDirection:"column" }}
                                  >
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                      style={{
                                        
                                        color: "grey",
                                        fontSize:"medium"
                                      }}
                                    />
                                    
                                  </NavLink>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <NavLink
                                    className="price"
                                    style={{ width: 25 }}
                                    onClick={() => handleDeleteCar(car._id)}
                                  >
                                    <i
                                      className="fa fa-trash"
                                      aria-hidden="true"
                                      style={{
                                       
                                      }}
                                    />
                                  </NavLink>
                                </>
                              )}
                            </ul>
                          </div>
                        </li>
                      </ul>
                    ))}
                </div>
              </ReactPlaceholder>
            )}
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default YourVehicle;
