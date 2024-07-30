import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.js";
import VehiclePage from "./pages/VehiclePage.js";
import "./styles/layout.css";
import "./styles/payment.css";

import PaymentMethod from "./components/PaymentMethod";
import SearchAuctions from "./components/SearchAuctions";
import About from "./pages/About";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Contact from "./pages/Contact";
import EmailDisclaimer from "./pages/EmailDisclaimer";
import ListingResults from "./pages/ListingResults";
import PageNotFound from "./pages/PageNotFound.js";
import ForgotPassword from "./pages/Password/ForgotPassword";
import ResetPassword from "./pages/Password/ResetPassword";
import UpdatePassword from "./pages/Password/UpdatePassword";
import PrivacyNotice from "./pages/PrivacyNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Auction from "./pages/Seller/Auction";
import AuctionStatus from "./pages/Seller/AuctionStatus";
import AuctionVehicleDetail from "./pages/Seller/AuctionVehicleDetail";
import CreateAuction from "./pages/Seller/CreateAuction";
import EditVehicle from "./pages/Seller/EditVehicle";
import SeeStatus from "./pages/Seller/SeeStatus";
import SoldHistory from "./pages/Seller/SoldHistory";
import TransactionHistory from "./pages/Seller/TransactionHistory.js";
import Form from "./pages/Seller/UploadVehicle";
import VehicleDetails from "./pages/Seller/VehicleDetails";
import YourVehicle from "./pages/Seller/YourVehicle";
import Services from "./pages/Services";
import TermsConditions from "./pages/TermsConditions";
import TermyOfUse from "./pages/TermyOfUse";
import Profile from "./pages/User/Profile";
import UserBiddingHistory from "./pages/User/UserBiddingHistory";
import WonAuctions from "./pages/User/WonAuctions";
import "./styles/listing.css";
import "./styles/productdetail.css";
import ErrorBoundary from "./utils/ErrorBoundary.js";
import ProtectedRoute from "./utils/ProtectedRoute";

//import Testimonials from "./components/Testimonial.jsx";
// import Frame from "./components/Frame.jsx";
// import WhyChooseUs from "./components/WhyChooseUs.jsx";
//import Testimonials from "./components/Testimonial.jsx";
//import Card from "./components/TestimonialCard.jsx"

function App() {
  return (
    <div className="App vh-100">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/vehicle" element={<ProductPage />} /> */}
          {/* <Route path="/SeeAll/:vehicle-type" element={<ListingResults />} /> */}
          <Route path="/SeeAll" element={<ListingResults />} />
          <Route path="/auction/:auctionId" element={<VehiclePage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacynotice" element={<PrivacyNotice />} />
          <Route path="/termsofuse" element={<TermyOfUse />} />
          <Route path="/emaildisclaimer" element={<EmailDisclaimer />} />
          <Route path="/aboutUs" element={<About/>}/>
          <Route path="/termsconditions" element={<TermsConditions />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/search/:search" element={<SearchAuctions />} />
          <Route path="/auction" element={<Auction />} />
          <Route
            path="/paymentgateway/:auctionId"
            element={<PaymentMethod />}
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="user" element={<Profile />} />
            <Route path="user/update-password" element={<UpdatePassword />} />
            <Route path="user/upload-product" element={<Form />} />

            <Route
              path="user/edit-car-details/:carId"
              element={<EditVehicle />}
            />
            <Route path="user/show-cars" element={<YourVehicle />} />
            <Route path="user/seeStatus/:auctionId" element={<SeeStatus />} />
            <Route
              path="user/auction-car/:auctionId"
              element={<AuctionVehicleDetail />}
            />
            <Route
              path="user/create-auction/:carId"
              element={<CreateAuction />}
            />
            <Route path="user/car/:carId" element={<VehicleDetails />} />
            <Route path="user/get-auction-status" element={<AuctionStatus />} />
            <Route path="user/history" element={<SoldHistory />} />
            <Route
              path="user/transaction-history"
              element={<TransactionHistory />}
            />
            <Route
              path="user/Bidding_history"
              element={<UserBiddingHistory />}
            />
            <Route path="user/auctions_won" element={<WonAuctions />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
