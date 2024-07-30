import React from "react";
import { NavLink } from "react-router-dom";
const PageHeading = (props) => {
  return (
    <div
      id="page-heading"
      style={{ backgroundimage: "url(/assets/images/vehicle_cover.jpg)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>{props.title || "Vehicle"} </h1>
            <div className="line" />

            <div className="page-active">
              <ul>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <i className="fa fa-circle" aria-hidden="true"></i>
                </li>
                <li>
                  <NavLink to="">{props.title || "Vehicle"}</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
