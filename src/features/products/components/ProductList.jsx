import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, handleEdit, handleDelete, handleAddToCart, lastProductRef, isAdmin }) => {

  return (
    <div className="">
      {products.length > 0 ? (
        products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleAddToCart={handleAddToCart}
            isAdmin={isAdmin}
            ref={index === products.length - 1 ? lastProductRef : null}  // Attach ref to the last product
          />
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
