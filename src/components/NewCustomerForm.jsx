import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function NewCustomerForm({ highestId, setHighestId }) {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: ''
  });

  const handleChange = event => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    // Generate a new customer object with an incremented ID
    const newCustomer = {
      ...customer,
      customerId: highestId + 1,
    };

    try {
      // Make the API request to save the new customer
      const response = await axios.post('http://localhost:8080/api/customer/create', newCustomer);

      // Handle the response as needed (maybe show a success message)
      console.log('Customer created successfully:', response.data);

      // Update the highestId state
      setHighestId(prevId => prevId + 1);
    } catch (error) {
      // Handle errors (maybe show an error message)
      console.error('Error creating customer:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
        
      <Form.Group controlId="formFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" name="firstName" onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" name="lastName" onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" name="address" onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="formPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="tel" name="phoneNumber" onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default NewCustomerForm;
