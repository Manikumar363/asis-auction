import PropTypes from "prop-types";
import "../styles/FrameComponent.css";
import { useState } from "react";
import { useEffect } from "react";

const FrameComponent = () => {
  return (
    <div className={`background-parent`}>
      <div className="background">
        <div className="div">1</div>
        <img
          className="background-child"
          loading="lazy"
          alt=""
          src="/assets/images/vector-4.svg"
        />
        <img
          className="background-item"
          loading="lazy"
          alt=""
          src="/assets/images/vector-4.svg"
        />
      </div>
      <div className="background1">
        <div className="div1">2</div>
      </div>
      <div className="background2">
        <div className="div2">3</div>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
