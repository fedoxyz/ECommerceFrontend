import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../features/products/components/ProductInfo";
import ProductReviews from "../features/reviews/components/ProductReviews";
import AddToCart from "../features/products/components/AddToCart";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from "../features/products/productSlice";

const ProductPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
      console.log(currentProduct)
    }
  }, [id, dispatch]);

  return (
    <>
      <ProductInfo/>
      <ProductReviews productId={id} />
      <AddToCart product={currentProduct} />
    </>
  );
};

export default ProductPage;
