import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, clearCart } from "../cartSlice";
import CartItem from "./CartItem";
import Button from '../../../components/common/Button';

const CartList = () => {
  const dispatch = useDispatch();
  const { items, status, error, hasFetchedCart } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log("useEffect in cart list triggered");
    console.log(status);
    console.log(hasFetchedCart) 
    // Only fetch if cart hasn't been fetched yet or if status is idle/failed
    if ((status === 'idle' || status === 'failed') && !hasFetchedCart) {
      console.log("dispatching fetch cart isAuthenticated", isAuthenticated)
      dispatch(fetchCart(isAuthenticated));
    }
  }, [dispatch, status, isAuthenticated]);

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      // Safely access price, use 0 if not available
      const itemPrice = item.price || 0;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  if (status === "loading") return <p>Loading...</p>;
  
  // Safe error handling
  if (status === "failed") {
    return <p>Error: {typeof error === 'object' ? error.message : error}</p>;
  }

  return (
    <div className="cart-list">
      {items.length < 1 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <p>Total: ${calculateTotal().toFixed(2)}</p>
          <Button theme="danger" onClick={() => dispatch(clearCart())}>
            Clear Cart
          </Button>
        </>
      )}
    </div>
  );
};

export default CartList;
