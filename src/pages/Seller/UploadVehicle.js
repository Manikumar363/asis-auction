import React, { useEffect, useState } from "react";
import { FormFloating } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SellerLayout from "../../components/Layout/Layout/SellerLayout";
import { UploadProducts } from "../../features/apiCall";
import PreStep from "./UploadForm/PreStep";
import Step1 from "./UploadForm/Step1";
import Step2 from "./UploadForm/Step2";
import Step3 from "./UploadForm/Step3";
import Step4 from "./UploadForm/Step4";

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

const Form = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const saveDataToSessionStorage = () => {
    const dataToStore = {
      formData: formData,
      images: images,
    };
    sessionStorage.setItem("formData", JSON.stringify(dataToStore));
  };
  useEffect(() => {
    const storedData = sessionStorage.getItem("formData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData.formData);
      setImages(parsedData.images || []); // Set images or an empty array if not present

      // setPreviewImages(parsedData.images || []); // Set images or an empty array if not present
      if (parsedData.formData && parsedData.formData.step) {
        setStep(parsedData.formData.step + 1);
      }
    }
  }, []);
  const nextStep = () => {
    if(step==2){
      
      if(formData.is_registered==="true"){
          const date= formData.expiry_date
          const exp =new Date(date)
          const exp_year=exp.getFullYear()

          const manu= parseInt(formData.manufacture_year)
    
          if(exp_year<manu){
             toast.error("Expiry year can't be lesser than manufacturing year",ErrorToastOptions)
             return
          }
      }

      

      if(formData.manufacture_year){
        const currentYear=new Date().getFullYear()
        const manufacturingYearRange = Array.from(
          { length: currentYear - 2009 },
          (_, index) => currentYear - index
        );
        // alert("For testing purpose these are allowed dates for manu")
        // alert(manufacturingYearRange)
      
        if(manufacturingYearRange.includes(parseInt(formData.manufacture_year))){
          
        }
        else{
           toast.error("You chose invalid manufacturing date",ErrorToastOptions)
           return;
        }
      }

      if(formData.is_registered==="true" && formData.expiry_date){
        const date= formData.expiry_date
        const exp =new Date(date)
        const exp_year=exp.getFullYear()

        const manu= parseInt(formData.manufacture_year)
  
        if(exp_year>manu+15){
           toast.error("Invalid expiry date, valid date is 15 year after manufacturing ",ErrorToastOptions)
           return
        }
         
      }
      
      if(formData.unique_identification_number?.trim===""){
        toast.error("Please enter VIN number",ErrorToastOptions)
        return
       }
    
    }
    if(step==3){
      
      if(formData.num_of_cylinders?.trim()===""){
        toast.error("Please enter number of clylinders",ErrorToastOptions)
        return
       }
    }
    setStep(step + 1);
    setFormData({ ...formData, step: step + 1 });
    saveDataToSessionStorage();
  };

  const prevStep = () => {
    console.log(formData)
    setStep(step - 1);
    setFormData({ ...formData, step: step - 1 });
    saveDataToSessionStorage();
  };

  const submitForm = async () => {
    try {
      const formdata = new FormData();

      formdata.append(
        "manufacture_company",
        formData.manufacture_company || ""
      );
      formdata.append("vehicle_type", formData.vehicle_type || "");
      formdata.append("model", formData.model || "");
      formdata.append("manufacture_year", formData.manufacture_year || "");
      formdata.append("expiry_date", formData.expiry_date || "");
      formdata.append(
        "unique_identification_number",
        formData.unique_identification_number || ""
      );
      formdata.append("color", formData.color || "");
      formdata.append("body_type", formData.body_type || "");
      formdata.append("owner", formData.is_owner ? "true" : "false");
      formdata.append(
        "autorized_person",
        formData.is_authorized_person ? "true" : "false"
      );
      formdata.append("axle_configuration", formData.axle_configuration || "");
      formdata.append("gvm", formData.gvm || "");
      formdata.append("engine_power", formData.engine_power || "");
      formdata.append("fuel_type", formData.fuel_type || "");
      formdata.append("transmission_type", formData.transmission_type || "");
      formdata.append("engine_capacity", formData.engine_capacity || "");
      formdata.append("odometer_reading", formData.odometer_reading || "");
      formdata.append("drive_type", formData.drive_type || "");
      formdata.append("num_of_cylinders", formData.num_of_cylinders || "");
      formdata.append("description", formData.description || "");
      formdata.append("car_address", formData.car_address || "");
      formdata.append("car_city", formData.car_city || "");
      formdata.append("car_state", formData.car_state || "");
      formdata.append("car_postal_code", formData.car_postal_code || "");
      formdata.append(
        "is_registered",
        formData.is_registered == "TRUE" ? "true" : "false"
      );
      formdata.append("car_shuburb", formData.car_suburb || "");
      // console.log(images);
      const images_url = [];
      // images_url.forEach((url, index) => {
      //   // images_url[i] = images[i];
      //   console.log(i, images[i]);
      //   formData.append(⁠ images_url[${index}] ⁠, url);

      //   // fsorm;
      // }
      console.log(images, images.length);
      images.forEach((url, index) => {
        formdata.append(`images_url[${index}]`, url);
      });

      // console.log(formdata.get("images_url"));
      const uploadSuccess = await UploadProducts(dispatch, formdata);

      if (uploadSuccess) {
        sessionStorage.clear();
        setStep(1);
        setFormData({});
        setImages([]);
      }
    } catch (error) {
      // console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.", ErrorToastOptions);
    }
  };

  switch (step) {
    case 1:
      return (
        <SellerLayout>
          <h3>Upload Vehicle</h3>
          <PreStep
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        </SellerLayout>
      );
    case 2:
      return (
        <SellerLayout>
          <h3>Upload Vehicle</h3>
          <Step1
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        </SellerLayout>
      );
    case 3:
      return (
        <SellerLayout>
          <h3>Upload Vehicle</h3>
          <Step2
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        </SellerLayout>
      );
    case 4:
      return (
        <SellerLayout>
          <h3>Upload Vehicle</h3>
          <Step3
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        </SellerLayout>
      );
    case 5:
      return (
        <SellerLayout>
          <h3>Upload Vehicle</h3>
          <Step4
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            submitForm={submitForm}
            setImages={setImages}
            // Images={images}
          />
        </SellerLayout>
      );
    default:
      return null;
  }
};

export default Form;
