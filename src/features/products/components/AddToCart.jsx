import React, { useMemo } from "react";
import Button from "../../../components/common/Button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCartItem, removeFromCart } from "../../cart/cartSlice";
import { updateProductStock } from "../productSlice";

const AddToCart = ({ productId, stock }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Memoized cart item lookup to prevent unnecessary re-renders
  const cartItem = useMemo(() => 
    cartItems.find((item) => item.ProductId === productId), 
    [cartItems, productId]
  );

  const handleCartItem = (isAdding = true) => {
    try {
      // Adding to cart
      if (isAdding) {
        if (stock < 1) {
          return;
        }
        
        if (cartItem) {
          // Increment existing cart item
          const newQuantity = cartItem.quantity + 1;
          dispatch(updateCartItem({ 
            itemId: cartItem.id, 
            quantity: newQuantity 
          }));
        } else {
          // Add new item to cart
          dispatch(addToCart({ productId, quantity: 1 }));
        }
        
        // Update product stock
        dispatch(updateProductStock({ 
          productId, 
          stockChange: -1 
        }));
      } 
      // Removing from cart
      else {
        if (!cartItem) return;

        if (cartItem.quantity <= 1) {
          // Remove item completely
          dispatch(removeFromCart(cartItem.id));
          dispatch(updateProductStock({ 
            productId, 
            stockChange: 1 
          }));
        } else {
          // Decrement cart item
          const newQuantity = cartItem.quantity - 1;
          dispatch(updateCartItem({ 
            itemId: cartItem.id, 
            quantity: newQuantity 
          }));
          dispatch(updateProductStock({ 
            productId, 
            stockChange: 1 
          }));
        }
      }
    } catch (error) {
      console.error("Error when managing cart item:", error);
    }
  };

  // No cart item or quantity is 0
  if (!cartItem || cartItem.quantity === 0) {
    return (
      <Button 
        onClick={() => handleCartItem(true)}
        disabled={stock < 1}
      >
        Add to cart
      </Button>
    );
  }

  // Cart item exists with quantity > 0
  return (
    <div className="flex items-center">
      <Button 
        onClick={() => handleCartItem(false)}
        className="mr-2"
      >
        -
      </Button>
      <span>{cartItem.quantity}</span>
      <Button 
        onClick={() => handleCartItem(true)}
        disabled={stock < 1}
        className="ml-2"
      >
        +
      </Button>
    </div>
  );
};

export default AddToCart;
