import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, clearCart } from "../cartSlice";
import CartItem from "./CartItem";
import Button from '../../../components/common/Button';

const CartList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="cart-list">
      {items.length === 0 ? <p>Your cart is empty.</p> : items.map((item) => <CartItem key={item.id} item={item} />)}
      {items.length > 0 && <p>Total: ${items.reduce((total, item) => total + item.price * item.quantity, 0)}</p>}
      {items.length > 0 && <Button theme="danger" onClick={() => dispatch(clearCart())}>Clear Cart</Button>}
    </div>
  );
};

export default CartList;

