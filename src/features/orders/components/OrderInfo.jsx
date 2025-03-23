import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import orderService from "../orderService";
import OrderItem from "./OrderItem";

const OrderInfo = ({ orderId }) => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const fetchedOrder = await orderService.getOrderById(orderId);
      console.log(fetchedOrder);
      setOrder(fetchedOrder);
    }
    fetchData();
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-info">
      <h2>Order Details</h2>
      <p><strong>Order Number:</strong> {order.orderNumber}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
      <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      
      <h3>Shipping Address</h3>
      <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
      
      <h3>Order Items</h3>
      <ul>
        {order.OrderItems.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default OrderInfo;

