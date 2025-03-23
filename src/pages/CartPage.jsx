import React from "react";
import CartList from "../features/cart/components/CartList";
import MakeOrder from "../features/orders/components/MakeOrder";

const CartPage = () => {
  return (
    <div>
      <h1>Your Cart</h1>
      <CartList />
      <MakeOrder/>    
    </div>
  );
};

export default CartPage;

