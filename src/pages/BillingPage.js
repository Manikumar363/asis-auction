import React, {  useState } from "react";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
// import Razorpay from "razorpay";
import { getError } from "../utils/error";
import {  useSelector } from "react-redux";
import { selectAuth } from "../features/authSlice";
import toast from "react-hot-toast";
import SubscriptionCards from "../components/SubscriptionCards";
import {
  baseAddr,
  useCapturePaypalPaymentMutation,
  useCreateOrderMutation,
  useCreatePaypalOrderMutation,
  useCreateSubscriptionMutation,
  useGetKeyMutation,
  useVerifySignatureMutation,
} from "../features/api";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const style = { layout: "vertical", shape: "pill" };


const ButtonWrapper = ({ showSpinner, selected }) => {
  const navigate = useNavigate();
  const [createPaypalOrder, {}] = useCreatePaypalOrderMutation();
  const [capturePaypalPayment, {}] = useCapturePaypalPaymentMutation();
  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder = async () => {
    try {
      const data = await createPaypalOrder({
        planId: selected?.planId,
        plan_typeId: selected?.plan_typeId,
      }).unwrap();       
     
      return data?.order?.id;
    } catch (err) {
      toast.error('Something went Wrong, please try again.')
      console.log(err);
    }
  }

  const onApprove = async (orderId) => {
    try {
      const {orderID} = orderId
      const data = await capturePaypalPayment(orderID).unwrap();
      toast.success('Payment Successfull')
      navigate('/dashboard/account');
      
    } catch (error) {
      // dispatch(hideLoading())
      toast.error('Something went Wrong, please try again.')
      console.log(error);
    }
  }

  return (
    <>
      {(showSpinner && isPending) && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => { console.log(err); window.alert(err.message); }}
      />
    </>
  );
};


function BillingPage() {
  const { refreshToken, user } = useSelector(selectAuth);

  const [selected, setSelected] = useState({});
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [createSubscription, { isLoading:autopayLoading }] = useCreateSubscriptionMutation();
  const [verifySignature, ] = useVerifySignatureMutation();
 
  const [getKey] = useGetKeyMutation();
  // const [isLoading, setIsLoading ] = useState(false);
  // const [order, setOrder] = useState(null);
  const [INRPayment,setINRPayment] = useState(true);

   const[showPaypalModal,setShowPaypalModal] = useState(false);
   const handleOpenModal = () => setShowPaypalModal(true);
  const handleCloseModal = () => setShowPaypalModal(false);


  const verifySignatureHandler = async()=>{
    try {
      const response = await verifySignature().unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }


  const autoPayHandler = async ()=>{
    try {
      const data = await createSubscription({
        plan_id: 'plan_NvyagbNGvEV1t7',
        // amount: selected,
      }).unwrap();

      console.log('autopay data:',data);

      const link = data?.subscription?.short_url
      window.location.href = link
      
    } catch (error) {
      console.log('Error in autopay',error);
      getError(error);
    }
  }

  const checkOutHandler = async () => {
    try {


      const data =  await createOrder({
        planId: selected?.planId,
        plan_typeId: selected?.plan_typeId,

        // amount: selected,
      }).unwrap();


      // const data = response?.data;

      const { key } = await getKey().unwrap();
      // Update the order state
      // setOrder(data?.order);

      const orderId = data?.order?.id;
      const orderAmount = data?.order?.amount;


      const options = {
        key,
        amount: orderAmount,
        currency: "INR",
        name: "String Geo",
        description: "Just one step to enjoy all prime features",
        image: "/logo/sblack.png",
        order_id: orderId,
        // handler: verifySignatureHandler,
        callback_url: `${baseAddr}/order/verify-signature?token=${refreshToken}`,
        // handler: function (response) {
        //   console.log(response);
        //   toast.success('Payment successfull! please login.')
        //   navigate('/auth/signin');
        // },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.mobile,
        },
        notes: {
          address: user?.states + user?.district + user?.city,
        },
        theme: {
          color: "#0B0A0A",
        },
      };

     
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log("Error in create order", error);
      getError(error);
    }
  };

  const handleSelectAndProceed = ()=>{
    if (!INRPayment) {
      handleOpenModal();
    } else {
      checkOutHandler();
    }
  }

  return (
    <section className="signin-bg full-section">
      <Container>
        {/* <Row>
          <Col className="text-center py-3">
            <HeaderLogo height={"80px"} />
          </Col>
        </Row> */}
        <Row className="d-flex justify-content-between pt-3 text-center">
          <Col>
            <Title
              title="Subscribe NOW ..!"
              desc="Select your plan to continue & Enjoy String Geo..!"
            />
          </Col>
          {/* <Col className="text-end">
            <Step step="3" />
          </Col> */}
        </Row>

        <div className="">
      
          <SubscriptionCards 
          selected={selected}
          setSelected={setSelected}
          setINRPayment={setINRPayment}  
  onClick={({ planId, plan_typeId }) => setSelected && setSelected({ planId, plan_typeId })}
  />
          {/* <Row className="text-center d-flex justify-content-center">
            <Col md={3}>
              <Button
                variant="transparent"
                className={`text-white w-100 my-2 fw-bold form-btn `}
                // onClick={()=>navigate('/auth/created')}
                //  onClick={checkOutHandler}
                onClick={autoPayHandler}
                // id="rzp-button1"
                disabled={selected.planId ? false : true || autopayLoading || isLoading}
              >
                {autopayLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  " Setup AutoPay"
                )}
              </Button>
             
            </Col>
          </Row> */}

          <Row className="text-center d-flex justify-content-center">
            <Col md={3}>
              <Button
                variant="transparent"
                className={`text-white w-100 my-2 fw-bold form-btn `}
                // onClick={()=>navigate('/auth/created')}
                //  onClick={checkOutHandler}
                onClick={handleSelectAndProceed}
                // id="rzp-button1"
                disabled={selected.planId ? false : true || autopayLoading || isLoading}
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  " Select Card & Proceed"
                )}
              </Button>
             
            </Col>
          </Row>
        </div>
      </Container>
      <Modal show={showPaypalModal} onHide={handleCloseModal}>
                  <Modal.Body>
                  <PayPalScriptProvider
                options={{
                  clientId:
                    "AaM69w6KJNrxNgV0y_ZtrDB4qZC9FIzcUEJPfRDiO3ZB1NbFf8gl7fDy4W20AfMeNK2bYTjwjHGZB0iI",
                  currency: "USD",
                  locale: "en_US",
                }}
              >
          {selected.planId? <ButtonWrapper showSpinner={true} selected={selected}  />:null}  

                {/* <PayPalButtons
                  style={style}
                  forceReRender={[style]}
                  fundingSource={undefined}
                  // createOrder={handleCreatePaypalOrder}
                  onApprove={handleCapturePaypalPayment}
                  createOrder={handleCreatePaypalOrder}
                  onError={(err) => {
                    console.log(err);
                    window.alert(err.message);
                  }}
                /> */}
                {/* <ButtonWrapper showSpinner={true} warrantyID={id} token={userToken} onClose={onClose} reRenderFunction={reRenderFunction}/> */}
              </PayPalScriptProvider>
                  </Modal.Body>
      </Modal>

    </section>
  );
}

export default  BillingPage;