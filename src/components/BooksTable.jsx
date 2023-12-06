import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

function BooksTable() {
  const [books, setBooks] = useState([]);

useEffect(() => {
  axios.get('http://localhost:8080/api/books/all')
    .then(response => {
      console.log('Books data:', response.data);
      setBooks(response.data);
    })
    .catch(error => {
      console.error('Error fetching books:', error);
      setError(error.message);
    });
}, []);

  // Check if books is defined before rendering
  if (!books) {
    return <div>Loading...</div>;
  }
  else{
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Genre</th>
          <th>Release Date</th>
          <th>Stock</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {books.map(book => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.genre}</td>
            <td>{book.releaseDate}</td>
            <td>{book.stock} ks</td>
            <td>{book.price} CZK</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );}
}

export default BooksTable;
