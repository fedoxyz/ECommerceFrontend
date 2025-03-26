import React, { useEffect, useState } from "react";
import productService from "../productService";

const ProductInfo = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = async (productId) => {
    try {
      setLoading(true);
      const response = await productService.getProductById(productId);
      console.log("response", response);
      setProduct(response);
      setError(null);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError(error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error loading product: {error.message}</div>;
  if (!product) return null;

  return (
    <div className="product-info">
      <h1>{product.name}</h1>
      <img 
        src={product.image || '/placeholder-image.png'} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-details">
        <p className="price">${product.price}</p>
        <p className="description">{product.description}</p>
        <div className="additional-details">
          <p>Category: {product.Category.name}</p>
          <p>Stock: {product.stockQuantity} available</p>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
