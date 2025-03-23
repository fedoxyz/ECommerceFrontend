const OrderItem = ({ item }) => {
  return (
    <li className="order-item">
      <p><strong>Product:</strong> {item.Product.name}</p>
      <p><strong>Description:</strong> {item.Product.description}</p>
      <p><strong>Price:</strong> ${item.price*item.quantity}</p>
      <p><strong>Quantity:</strong> {item.quantity}</p>
    </li>
  );
};

export default OrderItem;
