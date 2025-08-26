import React from "react";
import "../styles/TestimonialGridCustom.css";

const TestimonialCard = ({ name, desc, profilePic, rating }) => {
  // Render 5 stars, filled up to 'rating', rest outlined
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rating ? (
      <svg key={i} className="testimonial-card-star" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3l4.755 9.64 10.645 1.547-7.7 7.507 1.818 10.606L19 27.02l-9.518 5.28 1.818-10.606-7.7-7.507 10.645-1.547L19 3z" fill="#FFC107" stroke="#FFC107" strokeWidth="2"/>
      </svg>
    ) : (
      <svg key={i} className="testimonial-card-star" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3l4.755 9.64 10.645 1.547-7.7 7.507 1.818 10.606L19 27.02l-9.518 5.28 1.818-10.606-7.7-7.507 10.645-1.547L19 3z" fill="none" stroke="#FFC107" strokeWidth="2"/>
      </svg>
    )
  );

  return (
    <div className="testimonial-card-custom">
      <div className="testimonial-card-stars">{stars}</div>
      <div className="testimonial-card-desc">{desc}</div>
      <img src={profilePic} alt={name} className="testimonial-card-img" />
      <div className="testimonial-card-name">{name}</div>
    </div>
  );
};

export default TestimonialCard;
