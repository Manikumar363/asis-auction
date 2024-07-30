import React, { useState } from "react";
import {
  Button,
  Form,
  FormCheck,
  Modal,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ImagesGallery from "../../../components/ImageGallery";
import {
  UploadImageFailure,
  UploadImageStart,
  UploadImageSuccess,
} from "../../../features/VehicleSlice";
import axios from "../../../utils/axios";
import { parseError } from "../../../utils/parseError";
// import { ProgressBar } from "react-toastify/dist/components";

const Step4 = ({ formData, setFormData, setImages, prevStep, submitForm }) => {
  const { isUploading } = useSelector((state) => state.vehicle);
  const { isFetching } = useSelector((state) => state.vehicle);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [previewImages, setPreviewImages] = useState([]);
  const [previousImages, setPreviousImages] = useState([]);
  const [progress, setProgress] = useState(0);
  // const [Images, setImages] = useState([]);
  const [image, setImage] = useState([]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const ErrorToastOptions = {
    position: "bottom-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const successToastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const dispatch = useDispatch();
  const handleImageUpload = async (e) => {
    const formdata = new FormData();
    if (!instructionModalShown) {
      setShowInstructionModal(true);
      setInstructionModalShown(true);
    }

    const files = e.target.files;
    let allImages = [...previousImages];
    if (files.length > 4) {
      toast.error(
        "Upload 4 Images at a time! You can upload more images on clicking Choose more images later",
        ErrorToastOptions
      );
      return;
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 1024 * 1024 * 5) {
        toast.error(
          "Image size too large! only 5mb allowed.",
          ErrorToastOptions
        );
        return;
      }
    }
    const modifiedFiles = [];

    for (let i = 0; i < files.length; i++) {
      // console.log(files[i]);

      if (files[i].type.length < 0 && files[i].name.endsWith(".heic")) {
        // console.log("File information for .heic file:");

        // Create a new Blob with the same data and the desired type
        const modifiedBlob = new Blob([files[i]], { type: "images/heic" });
        // console.log('Filetype name is "images/heic" explicitly.');

        modifiedFiles.push(modifiedBlob);
      } else {
        modifiedFiles.push(files[i]);
      }
      formdata.append("image", files[i]);
    }

    try {
      for (let i = 0; i <= 100; i++) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 10));
      }
      dispatch(UploadImageStart());
      const { data } = await axios.post(`/api/car/add-car-images`, formdata, {
        headers: { Authorization: `${token}` },
      });

      setImages((prevImages) => [...prevImages, ...data.location]);
      await setPreviewImages((prevImages) => {
        if (!prevImages) {
          return [...data.location];
        } else {
          return [...prevImages, ...data.location];
        }
      });

      dispatch(UploadImageSuccess(data));
    } catch (error) {
      const errorMessage = parseError(error);
      toast.error(errorMessage, ErrorToastOptions);
      dispatch(UploadImageFailure(errorMessage));
    }
  };

  const handleRemoveImage = async (link) => {
    try {
      dispatch(UploadImageStart());
      const { data } = await axios.delete(`/api/car/remove-car-image`, {
        data: { img: link },
        headers: { Authorization: `${token}` },
      });
      setPreviewImages((prevImages) =>
        prevImages.filter((image) => image !== link)
      );
      setImages((prevImages) => prevImages.filter((image) => image !== link));

      dispatch(UploadImageSuccess(data));
    } catch (error) {
      const errorMessage = parseError(error);
      toast.error(errorMessage, ErrorToastOptions);
      dispatch(UploadImageFailure(errorMessage));
    }
  };

  const isFormComplete = () => {
    return (
      formData.description &&
      formData.description.trim() !== "" &&
      formData.description.length > 0 &&
      isCheckboxChecked
    );
  };

  const handleTooltipClick = () => {
    setShowTooltip(false); // Close the tooltip
  };

  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [instructionChecked, setInstructionChecked] = useState(false);
  const [instructionModalShown, setInstructionModalShown] = useState(false);

  const handleInstructionCheckboxChange = () => {
    setInstructionChecked(!instructionChecked);
  };
  const handleInstructionModalClose = () => {
    if (instructionChecked) {
      setShowInstructionModal(false);
    } else {
      alert("Mark the Check Box to move further!");
    }
  };

  const handleSubmit = () => {
    //  alert(formData.description)

    var mobileNumberRegex = /\b\d{10}\b|\d{10}/;
    if (mobileNumberRegex.test(formData.description)) {
      toast.error(
        "Do not enter mobile number in the description",
        ErrorToastOptions
      );
    } else {
      submitForm();
    }
  };
  const renderInstructionModal = () => (
    <Modal show={showInstructionModal} onHide={handleInstructionModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Image Upload Instructions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>
          Please make sure all the Damages, Missing parts, Wear and Tears be
          clear and visible in the photos.
        </h6>
        <div>
          <Form.Check
            type="checkbox"
            label={
              <span style={{ fontWeight: "bold" }} className="text-danger">
                Please check this box to proceed with the image upload.
              </span>
            }
            onChange={handleInstructionCheckboxChange}
            checked={instructionChecked}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleInstructionModalClose}>
          Next
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div>
      <h4>Step 4: Some More Features</h4> <hr />
      <div className="seller-upload-form">
        <div
          className="text-left m-3 p-2"
          style={{ backgroundColor: "#F1F7FB" }}
        >
          <p style={{ fontSize: "16px" }}> Some Instructions</p>
          <p style={{ color: "black" }}>
            1. Upload high-quality images of your item to attract more buyers.
          </p>
          <p style={{ color: "black" }}>
            2. Images should not be greater than 5MB
          </p>
          {/* <p style={{ color: "black" }}>
            3. Only Images are acceptable jpeg/jpg/avif/svg/png/heic
          </p>{" "} */}
          <p style={{ color: "black" }}>
            3.You can upload as many images on Clicking Choose images, but only
            4 Images are acceptable at a time!
          </p>
        </div>

        <table className="form-table">
          <tbody>
            <tr>
              <td>
                <Form.Label className="font-weight-bold">
                  Upload Images
                  <sup className="text-danger font-weight-bold">*</sup>:
                </Form.Label>
              </td>
              <td>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  name="images"
                  multiple
              
                  accept="image/jpeg,image/heic,image/*"
                  required
                  onClick={() => setShowTooltip(true)}
                />
                {isUploading ? (
                  <ProgressBar
                    now={progress}
                    label={`${progress}%`}
                    className="m-3"
                  />
                ) : (
                  <ImagesGallery
                    images={previewImages}
                    onRemove={handleRemoveImage}
                  />
                )}
              </td>
            </tr>
            {renderInstructionModal()}
            <tr>
              <td>
                <Form.Label className="font-weight-bold">
                  Description
                  <sup className="text-danger font-weight-bold">*</sup>:
                </Form.Label>
              </td>
              <td>
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  required
                />
                <div>
                  <span className="h6 text-danger font-weight-bold">
                    Your Vehicle condition must match the Description{"     "}
                    <FormCheck
                      type="checkbox"
                      name="desc_check"
                      onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                      value={formData.desc_check}
                      checked={formData.desc_check}
                      required
                    />
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {isFetching ? (
        <button className="advanced-button c-b" onClick={submitForm}>
          <Spinner animation="border" variant="light" />
        </button>
      ) : (
        <>
          <div className="m-3">
            <button className="advanced-button" onClick={prevStep}>
              Previous
            </button>
            <button
              className="advanced-button btn-success "
              onClick={handleSubmit}
              disabled={!isFormComplete()} // Disable the button if the form is not complete
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Step4;
