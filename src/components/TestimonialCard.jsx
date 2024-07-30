import React from "react";
import "../styles/Testimonial-common.css";
import "../styles/TestimonialCard.css";
function Card({ name, profilePic, desc, rating }) {
  let numArray = [1, 2, 3, 4, 5];
  return (
    <div className="testimonial-div3">
      <div className="testimonial-content2">
        <div className="testimonial-text">
          <div className="testimonial-posuere-sollicitudin-aliquam">{desc}</div>
        </div>
        <div className="testimonial-user1">
          <img className="testimonial-image-icon" alt="DP" src={profilePic} />
          <div className="testimonial-name">
            <div className="kathleen-smith">{name}</div>
            <div className="sub-text">
              {numArray.map((num) => {
                console.log(num, rating);
                let imgSrc = "/assets/images/star-1.svg";
                if (rating < num) {
                  imgSrc = "/assets/images/star-5.svg";
                }
                return <img className="sub-text-child" alt="" src={imgSrc} />;
              })}
            </div>
          </div>
        </div>
        <div className="testimonial-div4">
          <div className="testimonial-child" />
          <div className="testimonial-div2">“</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
