import React from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../features/products/components/ProductInfo";
import ProductReviews from "../features/reviews/components/ProductReviews";
import AddToCart from "../features/products/components/AddToCart";

const ProductPage = () => {
  const { id } = useParams();


  return (
    <>
      <ProductInfo productId={id} />
      <ProductReviews productId={id} />
      <AddToCart productId={id} />
    </>
  );
};

export default ProductPage;
