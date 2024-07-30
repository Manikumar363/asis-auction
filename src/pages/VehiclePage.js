import React from "react";

import Layout from "../components/Layout/Layout/Layout";

import ProductDetail from "../components/VehicleDetail";

import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { auctionId } = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Layout>
      <ProductDetail auctionId={auctionId} />
    </Layout>
  );
};

export default ProductPage;
