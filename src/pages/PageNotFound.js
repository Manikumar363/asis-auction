// import svg from "";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="cont-404">
        <img
          src="/assets/images/404.png"
          alt="svg"
          width={400}
          className="m-auto"
        />

        <Link to="/">
          {" "}
          <Button
            className=" m-auto mb-5"
            style={{ width: "150px", fontSize: "20px" }}
          >
            {" "}
            Back to Home{" "}
          </Button>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
