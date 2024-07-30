import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function ImagesGallery({ images, onRemove }) {
  // const { isUploading } = useSelector((state) => state.vehicle);
  const [selectedImage, setSelectedImage] = useState(null);
  // console.log(images);
  const openModal = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    // <ReactPlaceholder
    //   type="text"
    //   color="#F0F0F0"
    //   showLoadingAnimation
    //   rows={5}
    //   style={{ width: "80%" }}
    //   ready={!isUploading}
    // >
    // {/* <img src={images[0]} style={{ width: "70px", height: "70px" }} /> */}
    <div className="d-flex flex-row mt-3 mb-3 flex-wrap">
      {images &&
        images.map((url, index) => (
          <div key={url} className="mr-3">
            <NavLink
              className="position-relative"
              onClick={() => onRemove(url)}
              style={{ zIndex: "2", right: "6px", top: "10px" }}
            >
              <i
                className="fa fa-window-close text-danger"
                aria-hidden="true"
              />
            </NavLink>

            <div className="card" onClick={() => openModal(url)}>
              <img
                src={url}
                alt={`Image ${index + 1}`}
                style={{ width: "70px", height: "70px" }}
              />
            </div>
          </div>
        ))}

      {selectedImage && (
        <div>
          <div
            className="modal-backdrop"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 2,
            }}
            onClick={closeModal}
          ></div>

          <div className="modal" style={{ display: "block", zIndex: 2 }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" onClick={closeModal}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    // </ReactPlaceholder>
  );
}

export default ImagesGallery;
