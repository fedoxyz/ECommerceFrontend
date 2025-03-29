import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../orderService";

const OrdersList = ({page}) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await orderService.getUserOrders(currentPage);
        setOrders(response.data);
        setPagination(response.pagination);
        console.log(response)
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    navigate(`/my-orders?page=${page}`, { replace: true });
  };

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
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>Page {currentPage} of {pagination.pages}</span>
          <button
            disabled={currentPage === pagination.pages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default OrdersList;

