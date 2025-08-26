import { useEffect, useState } from "react";
import Card from "./TestimonialCard";
import "../styles/TestimonialGridCustom.css";
import { toast } from "react-toastify";
import instance from "../utils/axios";
import { useSelector } from "react-redux";

const Testimonials = () => {
  const { token } = useSelector((state) => state.auth);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback hardcoded testimonials
  const fallbackTestimonials = [
    {
      name: "Amir BMW",
      picture: "/assets/images/image@2x.png",
      description:
        "Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus turpis. pellentesque habitant morbil.",
      rating: 4,
    },
    {
      name: "Amir BMW",
      picture: "/assets/images/image@2x.png",
      description:
        "Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus turpis. pellentesque habitant morbil.",
      rating: 4,
    },
    {
      name: "Amir BMW",
      picture: "/assets/images/image@2x.png",
      description:
        "Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Massa placerat duis ultricies lacus turpis. pellentesque habitant morbil.",
      rating: 4,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await instance.get("/api/testimonial/all", {
          headers: { Authorization: token },
        });
        setTestimonials(res.data.testimonials);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  let displayTestimonials = [];
  if (loading) {
    displayTestimonials = [];
  } else if (testimonials.length > 0) {
    displayTestimonials = testimonials.slice(0, 3);
  } else {
    displayTestimonials = fallbackTestimonials;
  }

  return (
    <section className="testimonial-grid-section">
      <img src="/assets/images/Simplification.png" alt="decor" className="testimonial-decor-img" />
      <div className="testimonial-grid-header">
        <h2 className="testimonial-grid-title">
          <span className="testimonial-grid-title-black">Clients</span> <span className="testimonial-grid-title-blue">Testimonials</span>
        </h2>
        <div className="testimonial-grid-subtitle">
          Vivamus gravida magna massa in cursus mi vehicula at. Nunc sem quam suscipit
        </div>
      </div>
      <div className="testimonial-grid-cards">
        {loading ? (
          null
        ) : (
          displayTestimonials.map((review, idx) => (
            <Card
              key={idx}
              name={review.name}
              desc={review.description}
              profilePic={review.picture}
              rating={review.rating}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Testimonials;
