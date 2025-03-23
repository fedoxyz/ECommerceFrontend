import React from 'react';

const ProductItem = ({ product, handleEdit, handleDelete, handleAddToCart }) => {
  return (
    <div className="">
      <img
        src={product.imageUrl}
        alt={product.name}
        className=""
      />
      <h3 className="">{product.name}</h3>
      <p className="">{product.description}</p>
      <div className="">
        <p className="">${product.price}</p>
        <p className="">Stock: {product.stock}</p>
      </div>
      <div className="">
        <button
          onClick={() => handleEdit(product)}
          className=""
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(product.id)}
          className=""
        >
          Delete
        </button>
        <button
          onClick={() => handleAddToCart(product.id)}
          className=""
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
