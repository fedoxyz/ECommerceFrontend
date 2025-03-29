import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { updateCartItem, removeFromCart } from "../cartSlice";
import Button from '../../../components/common/Button';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const newValue = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
    dispatch(updateCartItem({ itemId: item.id, quantity: newValue }));
  };

  useEffect(()=> {
    console.log(item, "item inside CartItem")}
  , [])

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart-item">
      <h3>{item?.Product?.name}{item.status == "abandoned" ? " - abandoned" : ""}</h3>
      <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
      <input type="number" value={item.quantity} onChange={handleQuantityChange} min="1" />
      <Button theme="danger" onClick={handleRemove}>Remove</Button>
    </div>
  );
};

export default CartItem;
