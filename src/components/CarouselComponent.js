import React, { useEffect, useState } from "react";
import { Carousel, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../styles/carousel.css'
import { GetAuctions } from "../features/apiCall";
import { toast } from "react-toastify";

import axiosInstance from '../utils/axios'

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleSelect = (selectedIndex, e) => {
    setCurrentIndex(selectedIndex);
    setLoaded(false);
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const [promotions, setPromotions] = useState([]);
  const carouselItems = [
    {
      title: "Don't worry we have Solution !",
      caption: "we ensure your car is sold at the highest possible price. Trust us to handle every detail, providing you with a seamless and profitable selling experience. Join thousands of satisfied customers who have benefited from our commitment to excellence in car auctions.",
      button: "MORE OPPORUNITY",
      src: "/SeeAll",
    },

  ];
  const { token } = useSelector((state) => state.auth);
  const { isFetching } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/api/user/getpromotional", {
          headers: { Authorization: token },
        });
        console.log("for banners ", res.data.promotions);
        setPromotions(res.data.promotions);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [token]);
  return (
    <div>
      {/* <Carousel
        fade
        activeIndex={currentIndex}
        onSelect={handleSelect}
        pause={true}
        interval={8000}
        style={{ height: "100%" }}
      >
        {carouselItems.length > 0 &&
          carouselItems.map((item, index) => (
            <Carousel.Item key={index}>
              <div
                className="d-block w-100 carousel-home"
                style={{
                  backgroundImage: `url(${item?.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              >
                <div
                  className="carousel-caption d-flex flex-column justify-content-around "
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "redc",
                    padding: "20px",

                    borderRadius: "10px",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <div className="" style={{ marginTop: "-50px" }}>
                    <NavLink className="custom-button  m-auto" to="/SeeAll">
                      {item?.button}
                    </NavLink>

                    <h1 className="carousel-head">{item?.head}</h1>

                    <p className="carousel-p">{item?.caption}</p>
                  </div>
                  <div className="tp-caption slider-thumb d-flex start container hidden-xs hidden-sm"></div>
                </div>
              </div>
              <img
                src={item?.backgroundImage}
                style={{ display: "none" }}
                alt={`Preload ${item.caption}`}
                onLoad={handleImageLoad}
              />
            </Carousel.Item>
          ))}
      </Carousel> */}

      <Carousel
        fade
        activeIndex={currentIndex}
        onSelect={handleSelect}
        pause={true}
        interval={8000}
        indicators={true}
        style={{ height: "100%" }}
      >
        {promotions.length > 0 &&
          promotions.map((promotion, index) => (
            <Carousel.Item key={index}>
              <div
                className="d-block w-100 carousel-home"
                style={{
                  backgroundImage: `url(${promotion.promo_image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                  height: "65vh", // Adjust this value to fit your needs
                  overflow: "hidden",
                }}
              >
                <div
                  className="carousel-caption d-flex flex-column justify-content-around"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",

                    boxSizing: "border-box",
                    padding: "20px",
                    height: "100%",
                    borderRadius: "10px",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <div style={{ marginTop: "-50px" }}>
                    <h1 className="carousel-head">{promotion.title}</h1>
                    <p className="carousel-p ">{promotion.caption.toUpperCase()}</p>
                    <Link className="custom-button m-auto" to="/SeeAll" >
                      {promotion.button}
                    </Link>
                  </div>
                </div>
              </div>
              <img
                src={promotion.promo_image}
                style={{
                  display: "none",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Ensure the image covers the container without stretching
                }}
                alt={`Preload ${carouselItems[0].caption}`}
                onLoad={handleImageLoad}
              />
            </Carousel.Item>
          ))}
      </Carousel>
    </div>


  );
};

export default CarouselComponent;
