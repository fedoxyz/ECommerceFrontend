import React from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../features/products/components/ProductInfo";
import ProductReviews from "../features/reviews/components/ProductReviews";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <>
      <ProductInfo productId={id} />
      <ProductReviews productId={id} />
    </>
  );
};

export default ProductPage;
