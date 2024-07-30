import React, { useEffect, useState } from "react";
import { Card, NavLink } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SellerLayout from "../../components/Layout/Layout/SellerLayout";
import ImageUploadModal from "../../components/Modal/ImageUploadModal";
import {
  GetCarsFailure,
  GetCarsStart,
  GetCarsSuccess,
  UploadImageFailure,
  UploadImageStart,
  UploadImageSuccess,
} from "../../features/VehicleSlice";
import axios from "../../utils/axios";

import { toast } from "react-toastify";
import ProductCarousel from "../../components/VehicleCarousel";
import { parseError } from "../../utils/parseError";
import PageNotFound from "../PageNotFound";

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
const VehicleDetails = () => {
  const [show, setShow] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const { isFetching, isUploading } = useSelector((state) => state.vehicle);
  const { token } = useSelector((state) => state.auth);
  const { carId } = useParams();
  const [car, setCar] = useState([]);
  const [rerenderTrigger, setRerenderTrigger] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    const fetchDetails = async () => {
      dispatch(GetCarsStart());
      try {
        const { data } = await axios.get(`/api/car/get-car-details/${carId}`, {
          headers: { Authorization: token },
        });
        // console.log(data);
        setCar(data.car);
        dispatch(GetCarsSuccess(data));
      } catch (error) {
        dispatch(GetCarsFailure());
        setFetchError(true);
      }
    };

    fetchDetails();
  }, []);

  


  useEffect(() => {
    console.log(show);
  }, [show]);

  const handleEditClick = () => {
    navigate(`/dashboard/user/edit-car-details/${carId}`);
  };
  const handleCreateAuction = () => {
    navigate(`/dashboard/user/create-auction/${carId}`);
  };
  const handleImageUpload = async (images) => {
    dispatch(UploadImageStart());
  
    try {
      // Check if there are no images selected
   
      const { data } = await axios.patch(
        `/api/car/push-more-images/${carId}`,
        { images_url: images },
        {
          headers: { Authorization: `${token}` },
        }
      );
      dispatch(UploadImageSuccess(data));
      setShow(false);
      setRerenderTrigger((prevState) => !prevState);

      // if (!images.has("image")) {
      setShow(false);
      //   toast.error("No images selected", ErrorToastOptions);
      //   return;
      // } else {
      //   toast.success("Uploaded!", successToastOptions);
      // }
    } catch (error) {
      const errorMessage = parseError(error);
      toast.error(errorMessage, ErrorToastOptions);
      dispatch(UploadImageFailure(errorMessage));
    }
  };

  return (
    <SellerLayout>
      {fetchError ? (
        <PageNotFound />
      ) : (
        <>
          {" "}
          <h3>Update Vehicle Details</h3>
          <ReactPlaceholder
            type="text"
            color="#F0F0F0"
            showLoadingAnimation
            rows={5}
            style={{ width: "80%" }}
            ready={!isFetching}
          >
            <div className="container mt-5">
              <Card className="seller-Car-card">
                <div
                  className=" Edit-box text-end"
                  onClick={() => setShow(true)}
                >
                  <span className="mr-1 ">Add More Images</span>
                 
                  <i className="fas fa-add " />
                </div>
                <ImageUploadModal
                    showing={show}
                    onImageUpload={handleImageUpload}
                    // handleClose={willclosemodal}
                    handler={()=>{handleClose()}}
                    setShow={setShow}
                  />
                <div className="seller-vehicle-head">
                  <ProductCarousel
                    carId={car._id}
                    key={rerenderTrigger}
                    deleteParam={true}
                  />
                  <div className="car-details">
                    <div >
                    {!car.isAuction_created && (
                        <>
                          {" "}
                         
                            <button
                              
                              style={{ textAlign:"center",display:"flex",justifyContent:"center",alignItems:"center",border:"none",backgroundColor:"#F4C23D"}}
                              onClick={() => handleCreateAuction()}
                            >
                             
                              Create Auction
                            </button>
                         
                        </>
                      )}
                      <div style={{display:"flex",gap:"4px",flexDirection:"column"}}> 
                        <h2 style={{margin:0}}>{car.model}</h2>
                        <button 
                        style={{border:"none",background:"transparent"}}
                        onClick={handleEditClick}>
                        Edit
                        <i className="fas fa-edit " style={{margrinLeft:"2px"}}></i>
                        </button>

                      </div>
                     
                      {/* <h1 style={{margin:"0px"}}>{car.model}</h1>
                      <br/>
                      <NavLink
                         
                        
                      >
                        <span className="mr-1 ">Edit</span>
                        <i className="fas fa-edit "></i>
                      </NavLink> */}
                      
                    </div>
                  </div>
                </div>
                <div className="details">
                  <div className="head-side-bar">
                    <h4>Vehicle Details</h4>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li>
                            <span>Manufacturing Year:</span>
                            {car.manufacture_year}
                          </li>
                          <li>
                            <span>Fuel Type:</span>
                            {car.fuel_type}
                          </li>
                          <li>
                            <span>No of Cylinders</span> {car.num_of_cylinders}
                          </li>
                          <li>
                            <span>Transmission Type:</span>{" "}
                            {car.transmission_type}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li>
                            <span>Color:</span> {car.color}
                          </li>
                          <li>
                            <span>Engine Capacity:</span> {car.engine_capacity}
                          </li>
                          <li>
                            <span>Odometer Reading:</span>
                            {car.odometer_reading}
                          </li>
                          <li>
                            <span>VIN No:</span>{" "}
                            {car.unique_identification_number}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="details">
                  <div className="head-side-bar">
                    <h4>Vehicle Location</h4>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li style={{ display: "flex" }}>
                            {/* <span style={{textAlign:"right"}}>Complete Address:</span>
                            {car.car_address} */}
                            <span style={{ float: "left", width: "50%" }}>
                              Complete Address:
                            </span>
                            <div style={{textAlign:"left",width: "50%"}} >{car.car_address}</div>
                          </li>{" "}
                          <li style={{ display: "flex" }}>
                            {/* <span style={{textAlign:"right"}}>Complete Address:</span>
                            {car.car_address} */}
                            <span style={{ float: "left", width: "50%" }}>
                              City:
                            </span>
                            <div style={{textAlign:"left",width: "50%"}}  >
                              {car.car_city}
                            </div>
                          </li>
                          <li style={{ display: "flex" }}>
                            {/* <span style={{textAlign:"right"}}>Complete Address:</span>
                            {car.car_address} */}
                            <span style={{ float: "left", width: "50%" }}>
                              Suburb:
                            </span>
                            <div style={{textAlign:"left",width:"50%"}} >
                              {" "}
                              {car.car_shuburb}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="list-info">
                        <ul>
                          <li style={{ display: "flex" }}>
                            {/* <span style={{textAlign:"right"}}>Complete Address:</span>
                            {car.car_address} */}
                            <span style={{ float: "left", width: "50%" }}>
                              State:
                            </span>
                            <div style={{ textAlign: "left", width: "50%" }}>
                              {" "}
                              {car.car_state}
                            </div>
                          </li>

                          <li style={{ display: "flex" }}>
                            {/* <span style={{textAlign:"right"}}>Complete Address:</span>
                            {car.car_address} */}
                            <span style={{ float: "left", width: "50%" }}>
                              Postal Code:
                            </span>
                            <div style={{ textAlign: "left", width: "50%" }}>
                              {car.car_postal_code}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="details">
                  <div className="head-side-bar">
                    <h4>Description</h4>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <div className="list-info">
                        <p>{car.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </ReactPlaceholder>
        </>
      )}
    </SellerLayout>
  );
};

export default VehicleDetails;
