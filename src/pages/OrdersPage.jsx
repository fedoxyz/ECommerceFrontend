import OrderList from "../features/orders/components/OrderList";
import { useLocation } from "react-router-dom";

const OrdersPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = parseInt(searchParams.get("page"), 10) || 1; // Get page from query params
  return (
    <div className="">
      <h1>Your Orders</h1>
      <OrderList page={page}/>
    </div>
  );
};

export default OrdersPage;

