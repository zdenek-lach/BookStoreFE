import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import BooksTable from '../src/components/BooksTable';
import CustomersTable from '../src/components/CustomersTable';
import './App.css';
import reactLogo from './assets/react.svg';
import NewCustomerForm from './components/NewCustomerForm';
import OrderTable from './components/OrderTable';
import viteLogo from '/vite.svg';

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Bookstore!</h1>
      <NewCustomerForm />
      <CustomersTable />
      <OrderTable />
      <BooksTable />
    </>
  );
}

export default App;
