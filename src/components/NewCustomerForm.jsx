import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function NewCustomerForm() {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phoneNumber: '',
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setShowErrors(true);

    // Check for validation errors
    if (
      customer.firstName === '' ||
      customer.lastName === '' ||
      customer.email === '' ||
      customer.address === '' ||
      customer.phoneNumber === ''
    ) {
      setErrorMessage('Please fill in all required fields.');
      return; // Do not proceed with form submission
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/customer/create',
        customer
      );

      if (response.status === 200) {
        setErrorMessage(null);
        setShowErrors(false);
        console.log('Customer created successfully:', response.data);
      } else {
        setErrorMessage('Error creating customer: ' + response.data);
        console.error('Error creating customer:', response.data);
      }
    } catch (error) {
      setErrorMessage('Error creating customer: ' + error.message);
      console.error('Error creating customer:', error);
    }
  };
  return (
    <div>
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{errorMessage}</div>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formId">
          <Form.Control type="hidden" name="id" value={customer.id} />
        </Form.Group>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
            isInvalid={showErrors && customer.firstName === ''}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a first name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            onChange={handleChange}
            isInvalid={showErrors && customer.lastName === ''}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a last name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={handleChange}
            isInvalid={showErrors && customer.email === ''}
          />
          <Form.Control.Feedback type="invalid">
            Please enter an email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            onChange={handleChange}
            isInvalid={showErrors && customer.address === ''}
          />
          <Form.Control.Feedback type="invalid">
            Please enter an address.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            onChange={handleChange}
            isInvalid={showErrors && customer.phoneNumber === ''}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a phone number.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewCustomerForm;
