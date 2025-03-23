import React from 'react';
import Button from '../../../components/common/Button';

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
        <Button
          onClick={() => handleEdit(product)}
          className=""
        >
          Edit
        </Button>
        <Button
          theme="danger"
          onClick={() => handleDelete(product.id)}
          className=""
        >
          Delete
        </Button>
        <Button
          onClick={() => handleAddToCart(product.id)}
          className=""
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
