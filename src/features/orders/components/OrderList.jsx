import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../orderService";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const fetchedOrders = await orderService.getUserOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} onClick={() => navigate(`/order/${order.id}`)} className="order-item">
              <p><strong>Order Number:</strong> {order.orderNumber}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersList;

