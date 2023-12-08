import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function CustomersTable() {
  const [customers, setCustomers] = useState([]); // Rename 'customer' to 'customers' for clarity
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/customer/all')
      .then((response) => {
        console.log('Customer data:', response.data);
        setCustomers(response.data); // Rename 'setCustomer' to 'setCustomers'
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.firstName}</td>
            <td>{customer.lastName}</td>
            <td>{customer.email}</td>
            <td>{customer.address}</td>
            <td>{customer.phoneNumber}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CustomersTable;
