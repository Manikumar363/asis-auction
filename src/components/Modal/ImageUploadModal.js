import React, { useState,useEffect } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  UploadImageFailure,
  UploadImageStart,
  UploadImageSuccess,
} from "../../features/VehicleSlice";
import axios from "../../utils/axios";
import { parseError } from "../../utils/parseError";
import ImagesGallery from "../ImageGallery";

const ImageUploadModal = ({ showing, onImageUpload,handler,setShow }) => {
  const { isUploading } = useSelector((state) => state.vehicle);
  console.log(showing)
  const [open, showModal] = useState(showing);

  useEffect(() => {
    showModal(showing);
  }, [showing]);
 
  const handleClose = () => {showModal(false); setShow(false)}
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [previousImages, setPreviousImages] = useState([]);
  const [image, setImage] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
  const handleImageUpload = async (e) => {
    const formdata = new FormData();
    // if (!instructionModalShown) {
    //   setShowInstructionModal(true);
    //   setInstructionModalShown(true);
    // }
    const files = e.target.files;
    let allImages = [...previousImages];

    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 1024 * 1024 * 5) {
        toast.error(
          "Image size too large! only 5mb allowed.",
          ErrorToastOptions
        );
        return;
      }
    }
    for (let i = 0; i < files.length; i++) {
      formdata.append("image", files[i]);
    }
    try {
      dispatch(UploadImageStart());
      const { data } = await axios.post(`/api/car/add-car-images`, formdata, {
        headers: { Authorization: `${token}` },
      });
      // alert(data.location);
      // Update the state with the new images
      setImages(data.location);
      // Update the previewImages state based on the existing state
      await setPreviewImages((prevImages) => {
        // Ensure prevImages is not null or undefined
        if (!prevImages) {
          return [...data.location];
        } else {
          // Append the new images to the existing previewImages state
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("started");

    if (images) {
      // console.log(images);
      // Create FormData object
      // const formData = new FormData();

      // Append each image URL to formData
      // images.forEach((url, index) => {
      //   formData.append(`images_url[${index}]`, url);
      // });

      // Call the onImageUpload function with the formData
      await onImageUpload(images);
    }
    // Close the modal
  };

  return (
    <Modal show={open} centered onHide={handleClose}>
      <Modal.Header >
        <Modal.Title>Upload Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table className="form-table">
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
                />

                <ImagesGallery
                  images={previewImages}
                  onRemove={handleRemoveImage}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit} disabled={isUploading}>
          Next
        </Button>
        <Button variant="primary" onClick={handleClose}>
         Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageUploadModal;
