import React, { forwardRef} from 'react';
import Button from '../../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import AddToCart from './AddToCart';

const ProductItem = forwardRef(({ product, handleEdit, handleDelete, isAdmin }, ref) => {
  const navigate = useNavigate()

  return (
    <div  className="" ref={ref}>
    <div onClick={() => navigate(`/product/${product.id}`)}>
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
    </div>
      <div className="">
        {isAdmin && (<><Button
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
        </Button></>)}
        <AddToCart product={product}/>
      </div>)
    </div>
  );
});

export default ProductItem;
