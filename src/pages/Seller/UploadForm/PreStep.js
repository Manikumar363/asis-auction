import React from "react";

const PreStep = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, vehicle_type: value });
  };
  return (
    <div>
      <h6 className="text-center font-weight-bold">CHOOSE YOUR VEHICLE </h6>

      <div
        className="seller-upload-form d-flex justify-content-center "
        style={{ height: "200px" }}
      >
        <div className=" d-flex">
          <label className="car vehicle_type d-flex flex-column align-items-center m-3">
            <input
              className="radio-input "
              type="radio"
              name="vehicle_type"
              value="Car"
              onChange={handleChange}
            />
            <span className="radio-tile rounded border  bg-white">
              <span className="vehicle_type_icon">
                <i className="fas fa-car fa-2x"></i>
              </span>
              <p className=" ">Light-weight Vehicles</p>
            </span>
          </label>
          <label className="truck vehicle_type d-flex flex-column align-items-center m-3">
            <input
              className="radio-input "
              type="radio"
              name="vehicle_type"
              value="Truck"
              onChange={handleChange}
            />
            <span className="radio-tile rounded border  bg-white">
              <span className="vehicle_type_icon">
                <i className="fas fa-truck fa-2x"></i>
              </span>
              <p className="p">Heavy-weight Vehicles</p>
            </span>
          </label>
        </div>
      </div>
      <div className="m-3">
        <button className="advanced-button" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PreStep;
