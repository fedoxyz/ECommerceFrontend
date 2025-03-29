import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import orderService from "../orderService";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {setHasFetchedCart} from "../../cart/cartSlice";


const MakeOrder = () => {
  const [shippingAddress, setShippingAddress] = useState({})
  const dispatch = useDispatch();  
  const navigate = useNavigate();

  const mockAddress = {
    "street": "string",
    "city": "string",
    "state": "string",
    "postalCode": "string",
    "country": "string"
  }
  
  useEffect(() => {
    setShippingAddress(mockAddress)
  }, [])


  const handleMakeOrder = async () => {
    try {
      const order = await orderService.createOrder({shippingAddress: shippingAddress});
      navigate(`/order/${order.id}`);
      dispatch(setHasFetchedCart(false));
      console.log(order)
    } catch (error) {
      console.log(error);
    }
  }

  return (<div>
    
    <Button onClick={handleMakeOrder}>Make order</Button>
    </div>)
}

export default MakeOrder;
