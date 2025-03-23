import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import orderService from "../orderService";
import { useNavigate } from "react-router-dom";

const MakeOrder = () => {
  const [shippingAddress, setShippingAddress] = useState({})
  
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
