import logo from './logo.svg';
import './App.css';
import PhoneBook from './components/Phonebook';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
    <ToastContainer/>
    <PhoneBook/>
    </>
  );
}

export default App;
