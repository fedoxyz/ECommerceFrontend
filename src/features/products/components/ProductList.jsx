import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, handleEdit, handleDelete, handleAddToCart }) => {
  return (
    <div className="">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleAddToCart={handleAddToCart}
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
