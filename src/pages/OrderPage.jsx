import React from 'react';
import { useParams } from 'react-router-dom';
import OrderInfo from '../features/orders/components/OrderInfo'; // Adjust the import path as needed

const OrderPage = () => {
  const { id } = useParams();

  return (
    <div className="">
      <h1>Order Details</h1>
      <OrderInfo orderId={id}></OrderInfo>
    </div>
  );
};

export default OrderPage;
