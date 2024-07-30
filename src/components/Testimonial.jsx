import { useEffect, useRef, useState } from "react";
import Card from "./TestimonialCard";
import "../styles/Testimonial-common.css";
import "../styles/testimonial.css";
import { toast } from "react-toastify";
import instance from "../utils/axios";
import { useSelector } from "react-redux";

const Testimonials = () => {
  const { token } = useSelector((state) => state.auth);
  const reviews = [
    {
      name: "John Martin",
      picture: "/assets/images/image@2x.png",
      description:
        "Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus turpis. pellentesque habitant morbil.",
      rating: 3,
    },
    {
      name: "John Martin",
      picture: "/assets/images/image@2x.png",
      description:
        "Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus turpis. pellentesque habitant morbil.",
      rating: 3,
    },
  ];
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/api/testimonial/all", {
          headers: { Authorization: token },
        });
        console.log("for testimonials ", res.data);
        setTestimonials(res.data.testimonials);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [token]);

  let box = useRef(null);

  const btnpressprev = () => {
    let width = box.current.clientWidth;
    box.current.scrollLeft = box.current.scrollLeft - width;
    console.log(width);
  };

  const btnpressnext = () => {
    let width = box.current.clientWidth;
    box.current.scrollLeft = box.current.scrollLeft + width;
    console.log(width);
  };

  return (
    <div className="testimonial-section">
      <div className="testimonial-buttons-heading">
        <div className="testimonial-heading">
          <b className="testimonial-heading-client">CLIENTS TESTIMONIALS</b>
          <div className="testimonial-heading-caption">
            Vivamus gravida magna massa in cursus mi vehicula at. Nunc sem quam
            suscipit
          </div>
        </div>
        <div className="testimonial-buttons">
          <button
            class="arrow-button left-arrow "
            onClick={btnpressprev}
          ></button>
          <button
            class="arrow-button right-arrow "
            onClick={btnpressnext}
          ></button>
        </div>
      </div>

      <div ref={box} className="testimonial-content">
        {testimonials.map((review) => {
          return (
            <Card
              name={review.name}
              desc={review.description}
              profilePic={review.picture}
              rating={review.rating}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Testimonials;
