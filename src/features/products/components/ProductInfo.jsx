import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from "../productSlice";

const ProductInfo = ({ productId }) => {
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProduct(productId));
    }
  }, [productId, dispatch]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!currentProduct) return null;

  return (
    <div className="product-info">
      <h1>{currentProduct.name}</h1>
      <img 
        src={currentProduct.image || '/placeholder-image.png'} 
        alt={currentProduct.name} 
        className="product-image"
      />
      <div className="product-details">
        <p className="price">${currentProduct.price}</p>
        <p className="description">{currentProduct.description}</p>
        <div className="additional-details">
          <p>Category: {currentProduct.Category.name}</p>
          <p>Stock: {currentProduct.stock}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
