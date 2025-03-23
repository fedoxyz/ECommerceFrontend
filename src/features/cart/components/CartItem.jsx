import React from "react";
import { useDispatch } from "react-redux";
import { updateCartItem, removeFromCart } from "../cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    console.log("anyone")
    dispatch(updateCartItem({ itemId: item.id, quantity: parseInt(e.target.value) }));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart-item">
      <h3>{item.name}</h3>
      <p>Price: ${item.price * item.quantity}</p>
      <input type="number" value={item.quantity} onChange={handleQuantityChange} min="1" />
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

export default CartItem;
