import ChooseUs from "./ChooseUs";
import "../styles/WhyChooseUs.css";

const WhyChooseUs = () => {
  return (
    <div className="choose-container">
      <div className="choose-main-content">
        <div className="choose-header">
          <h1 className="choose-heading-2">
            Why <span className="choose-highlight">choose</span> us?
          </h1>
          <p className="choose-vivamus-gravida-magna">
            Vivamus gravida magna massa in cursus mi vehicula at. Nunc sem quam
            suscipit
          </p>
        </div>

        <div className="choose-central-section">
          <div className="choose-images-container">
            <div className="choose-central-image">
              <img
                className="choose-car-image"
                alt="Road view"
                src="/assets/images/road.png"
              />
            </div>
            <div className="choose-car-image-second">
              <img
                className="choose-car-image"
                alt="Car"
                src="/assets/images/car.png"
              />
            </div>
          </div>
          <ChooseUs />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;