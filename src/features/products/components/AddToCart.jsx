import React, { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, addToCart, updateCartItem, removeFromCart } from "../../cart/cartSlice";
import { updateProductStock } from "../productSlice";

const AddToCart = ({ productId }) => {
  const [isInCart, setIsInCart] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const [error, setError] = useState("");
  const { items, status, cartError } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (items && productId) {
      const cartItem = items.find(
        (item) => item.ProductId === productId
      );
      setCartItem(cartItem);
      setIsInCart(!!cartItem);
      console.log("cartItem", cartItem);
    }
  }, [items, productId]);

  const handleCartItem = (productId, addItem = true) => {
    try {
      const itemData = { productId, quantity: 1 };
      
      if (addItem) {
        if (cartItem?.Product?.stock < 1) {
          setError("Insufficient stock");
          return;
        }
        dispatch(addToCart(itemData));
        dispatch(updateProductStock(-1));
      } else {
        if (cartItem.quantity <= 1) {
          dispatch(removeFromCart(cartItem.id))
          dispatch(updateProductStock(1));
        } else {
          const quantity = cartItem.quantity - 1;
          dispatch(updateCartItem({itemId: cartItem.id, quantity}));
          dispatch(updateProductStock(1));
        }
      }
      setError("");
    } catch (error) {
      setError("Something went wrong!");
      console.error("Error when adding/removing item in cart:", error);
    }
  };

  return (
    <>
      {isInCart && cartItem.quantity != 0 ? (
        <>
          <Button onClick={() => handleCartItem(productId, false)}>{"<"}</Button>
          <Button onClick={() => handleCartItem(productId, true)}>{">"}</Button>
        </>
      ) : (
        <Button onClick={() => handleCartItem(productId)}>Add to cart</Button>
      )}
      {error && <p>{error}</p>}
    </>
  );
}

export default AddToCart;
