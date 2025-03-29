import React, { useMemo, useEffect } from "react";
import Button from "../../../components/common/Button";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCartItem, removeFromCart, setCart } from "../../cart/cartSlice";
import { updateProductStock } from "../productSlice";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Memoized cart item lookup to prevent unnecessary re-renders
  const cartItem = useMemo(() => 
    cartItems.find((item) => item.ProductId === product?.id), 
    [cartItems, product?.id]
  );

  // Load cart from local storage on component mount for guest users
  useEffect(() => {
    if (!isAuthenticated) {
      const storedCart = localStorage.getItem('guestCart');
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          dispatch(setCart(parsedCart));
        } catch (error) {
          console.error('Error parsing guest cart', error);
        }
      }
    }
  }, [isAuthenticated, dispatch]);

  // Update local storage whenever cart changes for guest users
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('guestCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  const handleCartItem = (isAdding = true) => {
    try {
      // Adding to cart
      if (isAdding) {
        if (product.stock < 1 && isAuthenticated) {
          return;
        }
        
        if (cartItem) {
          console.log("cartItem exists", cartItem)
          // Increment existing cart item
          const newQuantity = cartItem.quantity + 1;
          var itemData = { productId: product.id, quantity: newQuantity }
          if (!isAuthenticated) {
            if (cartItem.quantity >= product.stock) {
              return;
            }
            console.log(product, 'product for unauthorized')
            itemData = {...itemData, id: cartItem.id, price: product.price, Product: { name: product.name}}
            console.log(itemData)
          }
          dispatch(updateCartItem(itemData));
        } else {
          var itemData = { productId: product.id, quantity: 1 }
          if (!isAuthenticated) {
            console.log(product, 'product for unauthorized')
            itemData = {...itemData, price: product.price, Product: { name: product.name}}
            console.log(itemData)
          }
          console.log("adding item to cart", product.id)
          dispatch(addToCart(itemData));
        }

        if (isAuthenticated) {
          dispatch(updateProductStock({ 
            productId: product.id, 
            stockChange: -1 
          }));
        }
      }
      // Removing from cart
      else {
        if (!cartItem) return;
        if (cartItem.quantity <= 1) {
          // Remove item completely
          dispatch(removeFromCart(cartItem.id));
          if (isAuthenticated) {
            dispatch(updateProductStock({ 
              productId: product.id, 
              stockChange: 1 
            }));
          }
        } else {
          // Decrement cart item
          var itemData = {id: cartItem.id, quantity: cartItem.quantity - 1}
          dispatch(updateCartItem(itemData));
        }
        if (isAuthenticated) {
          dispatch(updateProductStock({ 
            productId: product.id, 
            stockChange: 1 
          }));
        }
      }
    } catch (error) {
      console.error("Error when managing cart item:", error);
    }
  };
  
  if (!product) {
    return <div>Loading...</div>
  }

  // No cart item or quantity is 0
  if (!cartItem || cartItem.quantity === 0) {
    return (
      <Button 
        onClick={() => handleCartItem(true)}
        disabled={product.stock < 1}
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
        disabled={product.stock < 1}
        className="ml-2"
      >
        +
      </Button>
    </div>
  );
};

export default AddToCart;
