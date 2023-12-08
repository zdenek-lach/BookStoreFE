import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/order/all')
      .then((response) => {
        console.log('Order data:', response.data);
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {orders.length === 0 ? (
        <div>No orders to show</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Book Title</th>
              <th>Order Date</th>
              <th>Quantity</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{`${order.customer.firstName} ${order.customer.lastName}`}</td>
                <td>{order.book.title}</td>
                <td>{order.orderDate}</td>
                <td>{order.quantity}</td>
                <td>{order.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default OrderTable;
